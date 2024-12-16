import { Table, TableHead, TableBody, TableCell, TableHeaderCell, TableRow } from '../components/Table';
import { BottonExporOracleReport } from '../components/ExportOracle';
import { ReportOracleInterface } from '../types/Interfaces';
import Loading from '../components/ui/LoadingComp';
import { URL_API_DATA } from '../utils/contanst';
import { FormEvent, useState } from 'react';
import { Label } from '../components/Label';
import axios from 'axios';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
}

const municipioString = (municipio: number): string => {
  const municipios: { [key: string]: string } = {
    39629: 'YUMBO',
    39630: 'VIJES',
    39631: 'CUMBRE',
    39632: 'JAMUNDI'
  };
  return municipios[municipio] || 'NO DEFINIDO';
}

export default function ReportOracle() {
  const [date1, setDate1] = useState<string>('')
  const [date2, setDate2] = useState<string>('')
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<ReportOracleInterface[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    setLoading(true);

    axios.post(`${URL_API_DATA}/oracle/report`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className='relative flex flex-col'>

      <div className='w-full flex gap-4 px-2 pt-1 items-center border-b pb-2'>
        <div>
          <Label className='font-semibold'>Fecha Inicial: </Label>
          <input type='date' className='p-2 rounded-md' value={date1} onChange={ev => setDate1(ev.target.value)} />
        </div>

        <div>
          <Label className='font-semibold'>Fecha Final: </Label>
          <input type='date' className='p-2 rounded-md' value={date2} onChange={ev => setDate2(ev.target.value)} />
        </div>

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
          <p className='font-semibold'>Cantidad De Datos:</p>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>
            {data.length}
          </span>

        </div>

        <div>
          {
            data.length > 0 ? <BottonExporOracleReport datos={data} /> : null
          }
        </div>
      </div>

      <div className='h-[92vh] overflow-y-auto'>
        <Table>
          <TableHead className='bg-blue-100'>
            <TableRow>
              <TableHeaderCell>FECHA</TableHeaderCell>
              <TableHeaderCell>SERIE</TableHeaderCell>
              <TableHeaderCell>$ PREMIO</TableHeaderCell>
              <TableHeaderCell>VENDEDOR</TableHeaderCell>
              <TableHeaderCell>NOMBRES</TableHeaderCell>
              <TableHeaderCell>HORA</TableHeaderCell>
              <TableHeaderCell>PUNTO PAGO</TableHeaderCell>
              <TableHeaderCell>MUNICIPIO</TableHeaderCell>
              <TableHeaderCell>CLIENTE</TableHeaderCell>
              <TableHeaderCell>NOMBRE CL</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fechapago.split('T')[0]}</TableCell>
                  <TableCell>{item.serie}</TableCell>
                  <TableCell className='text-right'>{formatPrice(item.premio)}</TableCell>
                  <TableCell className='text-right'>{item.vendedor}</TableCell>
                  <TableCell>{item.nombres}</TableCell>
                  <TableCell>{item.hora}</TableCell>
                  <TableCell>{item.punto_vta_pago}</TableCell>
                  <TableCell>{municipioString(item.municipio)}</TableCell>
                  <TableCell>{item.cliente}</TableCell>
                  <TableCell>{item.nombrecliente}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

      {
        loading ? <Loading /> : null
      }

    </section>
  )
}