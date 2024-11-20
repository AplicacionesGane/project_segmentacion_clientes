import { ReportPremios } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'

const generateExcelData = (datos: ReportPremios[]): unknown[] => {
  const titulo = [{ A: 'Reporte Premios Pagados Por Colocadores' }]
  const headers = [
    {
      A: 'TIPO DOCUMENTO',
      B: 'DOCUMENTO',
      C: 'NOMBRES',
      D: 'CATEGORÍA',
      E: 'CANTIDAD PREMIOS CHANCE',
      F: 'CANTIDAD PREMIOS ASTRO',
      G: 'CANTIDAD PREMIOS LOTERÍA',
      H: 'CANTIDAD PREMIOS RASPE',
      I: 'TOTAL PREMIOS COBRADOS',
      J: 'DIRECCIÓN',
      K: 'TELÉFONO',
    }
  ]

  const rows = datos.map((it) => ({
    A: it.Client.TIPODOCUMENTO,
    B: it.TERCERO,
    C: it.Client.NOMBRES,
    D: it.Client.CATEGORIA,
    E: it.CANT_PREMIOS_CHANCE,
    F: it.CANT_PREMIOS_ASTRO,
    G: it.CANT_PREMIOS_LOTERIA,
    H: it.CANT_PREMIOS_RASPE,
    I: it.TOTAL_PREMIOS_COBRADOS,
    J: it.Client.DIRECCION,
    K: it.Client.TELEFONO1,
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
  writeFile(libro, 'ReportePremiosPagados.xlsx')
}

export const BottonExporPremios = ({ datos }: { datos: ReportPremios[] }): JSX.Element => {
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
    <button onClick={handleDownload} className='bg-green-300 hover:bg-green-400  p-2 rounded-md text-black'>
      Exportar a Excel
    </button>
  )
}