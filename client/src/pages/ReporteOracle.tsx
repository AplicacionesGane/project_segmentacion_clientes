import { Table, TableHead, TableBody, TableCell, TableHeaderCell, TableRow } from '../components/Table';
import { BottonExporOracleReport } from '../components/ExportOracle';
import { ReportOracleInterface } from '../types/Interfaces';
import { URL_API_DATA } from '../utils/contanst';
import { FormEvent, useState } from 'react';
import { Label } from '../components/Label';
import axios from 'axios';

export default function ReportOracle() {
  const [date1, setDate1] = useState<string>('')
  const [date2, setDate2] = useState<string>('')
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [data, setData] = useState<ReportOracleInterface[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    axios.post(`${URL_API_DATA}/oracle/report`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
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
              <TableHeaderCell>FECHA PAGO</TableHeaderCell>
              <TableHeaderCell>SERIE</TableHeaderCell>
              <TableHeaderCell>Valor Premio</TableHeaderCell>
              <TableHeaderCell>VENDEDOR</TableHeaderCell>
              <TableHeaderCell>NOMBRES</TableHeaderCell>
              <TableHeaderCell>HORA</TableHeaderCell>
              <TableHeaderCell>PUNTO_VTA_PAGO</TableHeaderCell>
              <TableHeaderCell>APLICACION</TableHeaderCell>
              <TableHeaderCell>MUNICIPIO</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.fechapago}</TableCell>
                  <TableCell>{item.serie}</TableCell>
                  <TableCell>{item.premio}</TableCell>
                  <TableCell>{item.vendedor}</TableCell>
                  <TableCell>{item.nombres}</TableCell>
                  <TableCell>{item.hora}</TableCell>
                  <TableCell>{item.punto_vta_pago}</TableCell>
                  <TableCell>{item.aplicacion}</TableCell>
                  <TableCell>{item.municipio}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>

    </section>
  )
}