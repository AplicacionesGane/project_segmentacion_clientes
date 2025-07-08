import { ReportMayores } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'
import { Button } from './ui/button'

const generateExcelData = (datos: ReportMayores[]): unknown[] => {
  const titulo = [{ A: 'Reporte Premios Mayores 15UVT' }]
  const headers = [
    {
    A: 'TIPO DOCUMENTO',
    B: 'DOCUMENTO',
    C: 'NOMBRES',
    D: 'SERIE KARDEX',
    E: 'SERIE CONSECUTIVO',
    F: 'TOTAL PREMIOS',
    G: 'CÓDIGO DANE',
    H: 'FECHA PAGO',
    }
  ]

  const rows = datos.map((it) => ({
    A: it.Client.TIPODOCUMENTO,
    B: it.TERCERO,
    C: it.Client.NOMBRES,
    D: it.SERIE_KARDEX,
    E: it.SERIE_CONSECUTIVO,
    F: it.TOTAL_PREMIOS,
    G: it.COD_DANE,
    H: it.FECHAPAGO,
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
  utils.book_append_sheet(libro, hoja, 'Baloto')
  writeFile(libro, 'ReportePremiosMayores.xlsx')
}

export const BottonExporMayores = ({ datos }: { datos: ReportMayores[] }): JSX.Element => {
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