import { ReportOracleInterface } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'

const generateExcelData = (datos: ReportOracleInterface[]): unknown[] => {
  const titulo = [{ A: 'Reporte Premios Pagados Baloto ' }]
  const headers = [
    {
      A: 'FECHAPAGO',
      B: 'SERIE',
      C: 'PREMIO',
      D: 'VENDEDOR',
      E: 'NOMBRES',
      F: 'HORA',
      G: 'PUNTO_VTA_PAGO',
      H: 'APLICACION',
      I: 'MUNICIPIO'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.FECHAPAGO,
    B: it.SERIE,
    C: it.PREMIO,
    D: it.VENDEDOR,
    E: it.NOMBRES,
    F: it.HORA,
    G: it.PUNTO_VTA_PAGO,
    H: it.APLICACION,
    I: it.MUNICIPIO
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
    <button onClick={handleDownload} className='bg-yellow-300 hover:bg-yellow-400  p-2 rounded-md text-black'>
      Exportar a Excel
    </button>
  )
}