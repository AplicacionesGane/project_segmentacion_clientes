import { Table, TableHead, TableBody, TableCell, TableHeaderCell, TableRow } from '../components/Table';
import { CalendarLocaleExample } from '../components/ui/SelectDate';
import { ReportPremios } from '../types/Interfaces';
import { URL_API_DATA } from '../utils/contanst';
import { FormEvent, useMemo, useState } from 'react';
import axios from 'axios';
import { BottonExporPremios } from '../components/ExportarCobrados';


export default function ReportesPage() {
  const [date1, setDate1] = useState<Date | undefined>(undefined)
  const [date2, setDate2] = useState<Date | undefined>(undefined)
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [data, setData] = useState<ReportPremios[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    axios.post(`${URL_API_DATA}/reporCobrados`, { fecha1: date1.toISOString().slice(0, 10), fecha2: date2.toISOString().slice(0, 10), zona })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const filteredData = useMemo(() => {
    if (!data) return null
    return data.filter(item => item.TERCERO.includes(filter))
  }, [data, filter])

  return (
    <section className='relative flex flex-col'>

      <div className='w-full flex gap-4 px-2 pt-1 items-center border-b pb-2'>
      <button onClick={() => setVisible(!visible2)}
          className={`${visible2 ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-md w-40`} >
          {visible2 ? 'Ocultar' : 'Fecha Inicial'}
        </button>


        <article className='w-56'>
          <span className='font-semibold'>Fecha Inicial:</span> {date1?.toISOString().slice(0, 10) || ' '}
        </article>

        <button onClick={() => setVisible2(!visible2)}
          className={`${visible2 ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-md w-40`} >
          {visible2 ? 'Ocultar' : 'Fecha Final'}
        </button>

        <article className='w-56'>
          <span className='font-semibold'>Fecha Final:</span> {date2?.toISOString().slice(0, 10) || ' '}
        </article>

        <form onSubmit={handleSubmit} className='gap-2 flex'>
          <select name='zona' className='px-4 rounded-md w-52' value={zona} onChange={e => setZona(e.target.value)}>
            <option value=' '>Selecione Empresa</option>
            <option value='39627'>Multired</option>
            <option value='39628'>Servired</option>
          </select>

          <button type='submit' className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-md w-40'>
            Solicitar Reporte
          </button>
        </form>

        <div className='flex gap-2 items-center'>
          <p className='font-semibold'> N° Datos:</p>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>
            {data.length}
          </span>

        </div>

        <div>
          {
            data.length > 0 ? <BottonExporPremios datos={data} /> : null
          }
        </div>

        <div>
          <input type='text'
            placeholder='Filtrar por documento' className='px-2 py-1 rounded-md border border-gray-200'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>


      <div className='absolute z-20 top-12 left-2'>
        {visible && (<CalendarLocaleExample key={'fechaInitial'} value={date1} onChange={setDate1} />)}
      </div>

      <div className='absolute z-20 top-12 left-96'>
        {visible2 && (<CalendarLocaleExample key={'fechaFinal'} value={date2} onChange={setDate2} />)}
      </div>


      <div className='h-[92vh] overflow-y-auto'>
        <Table>
          <TableHead className='bg-blue-100'>
            <TableRow>
              <TableHeaderCell>Tipo Documento</TableHeaderCell>
              <TableHeaderCell>Documento</TableHeaderCell>
              <TableHeaderCell>Nombres</TableHeaderCell>
              <TableHeaderCell>Categoria</TableHeaderCell>
              <TableHeaderCell>Cantidad Premios Chance</TableHeaderCell>
              <TableHeaderCell>Cantidad Premios Astro</TableHeaderCell>
              <TableHeaderCell>Cantidad Premios Loteria</TableHeaderCell>
              <TableHeaderCell>Cantidad Premios Raspe</TableHeaderCell>
              <TableHeaderCell>Total Premios Cobrados</TableHeaderCell>
              <TableHeaderCell>Direcion</TableHeaderCell>
              <TableHeaderCell>Telefono</TableHeaderCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.Client.TIPODOCUMENTO}</TableCell>
                  <TableCell>{item.TERCERO}</TableCell>
                  <TableCell>{item.Client.NOMBRES}</TableCell>
                  <TableCell>{item.Client.CATEGORIA}</TableCell>
                  <TableCell>{item.CANT_PREMIOS_CHANCE}</TableCell>
                  <TableCell>{item.CANT_PREMIOS_ASTRO}</TableCell>
                  <TableCell>{item.CANT_PREMIOS_LOTERIA}</TableCell>
                  <TableCell>{item.CANT_PREMIOS_RASPE}</TableCell>
                  <TableCell>{item.TOTAL_PREMIOS_COBRADOS}</TableCell>
                  <TableCell>{item.Client.DIRECCION}</TableCell>
                  <TableCell>{item.Client.TELEFONO1}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

    </section>
  )
}