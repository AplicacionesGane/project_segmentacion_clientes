import { ReportLaft } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'

const generateExcelData = (datos: ReportLaft[]): unknown[] => {
  const titulo = [{ A: 'Reporte LAFT-FPADM' }]
  const headers = [
    {
        A: 'TIPO DOCUMENTO',
        B: 'DOCUMENTO',
        C: 'NOMBRES',
        D: 'CANTIDAD PREMIOS CHANCE',
        E: 'CANTIDAD PREMIOS ASTRO',
        F: 'CANTIDAD PREMIOS LOTERÍA',
        G: 'CANTIDAD PREMIOS RASPE',
        H: 'TOTAL PREMIOS COBRADOS',
        I: 'DIRECCIÓN',
        J: 'TELÉFONO',
        K: 'PEP',
    }
  ]

  const rows = datos.map((it) => ({
    A: it.Client.TIPODOCUMENTO,
    B: it.TERCERO,
    C: it.Client.NOMBRES,
    D: it.CANT_PREMIOS_CHANCE,
    E: it.CANT_PREMIOS_ASTRO,
    F: it.CANT_PREMIOS_LOTERIA,
    G: it.CANT_PREMIOS_RASPE,
    H: it.TOTAL_PREMIOS_COBRADOS,
    I: it.Client.DIRECCION,
    J: it.Client.TELEFONO1,
    K: it.Client.PEP,
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

export const BottonExporLaft = ({ datos }: { datos: ReportLaft[] }): JSX.Element => {
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