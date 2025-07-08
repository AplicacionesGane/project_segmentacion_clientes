import { ReportOracleInterface } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'
import { municipioString } from '../utils/funtions'
import { Button } from './ui/button'

const generateExcelData = (datos: ReportOracleInterface[]): unknown[] => {
  const titulo = [{ A: 'Reporte Premios Pagados en PDV (CP2) Oracle' }]
  const headers = [
    {
      A: 'FECHA',
      B: 'SERIE',
      C: 'PREMIO',
      D: 'VENDEDOR',
      E: 'NOMBRES',
      F: 'HORA',
      G: 'PUNTO_PAGO',
      H: 'MUNICIPIO',
      I: 'CLIENTE',
      J: 'NOMBRE_CL'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.fechapago.split('T')[0],
    B: it.serie,
    C: it.premio,
    D: it.vendedor,
    E: it.nombres,
    F: it.hora,
    G: it.punto_vta_pago,
    H: municipioString(it.municipio),
    I: it.cliente,
    J: it.nombrecliente
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 30 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'PagadosCP2')
  writeFile(libro, 'ReporteOracle.xlsx')
}

export const BottonExporOracleReport = ({ datos }: { datos: ReportOracleInterface[] }): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <Button
      onClick={handleDownload}
      className='bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-md text-black cursor-pointer shadow-md hover:shadow-lg transition-all duration-200'
    >
      Exportar a Excel
    </Button>
  )
}