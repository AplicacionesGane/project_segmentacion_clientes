import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { BottonExporClientGanador } from '../components/ExportClientGanador';
import { FormEvent, useEffect, useState } from 'react';
import { DataCliente } from '../types/Interfaces';
import { URL_API_DATA } from '../utils/contanst';
import { Label } from '../components/Label';
import axios from 'axios';

export default function ReportClienteGanadores() {
  const [date1, setDate1] = useState<string>('')
  const [date2, setDate2] = useState<string>('')
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')

  const [data, setData] = useState<DataCliente[]>([]);

  const [clientsFiltered, setClientsFiltered] = useState<DataCliente[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    axios.post(`${URL_API_DATA}/reporClientGanadores`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setClientsFiltered(data.filter(item => item.Client.DOCUMENTO.includes(filter)));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, data]);

  return (
    <section>
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
          <input type='text'
            placeholder='Filtrar por documento' className='px-2 py-1 rounded-md border border-gray-200'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div>
          {
            data.length > 0 ? <BottonExporClientGanador datos={data} /> : null
          }
        </div>

      </div>

      <div className='h-[92vh] overflow-y-auto'>
        {
          data.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Documento</TableHeaderCell>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Dirección</TableHeaderCell>
                  <TableHeaderCell>Teléfono</TableHeaderCell>
                  <TableHeaderCell>Premios</TableHeaderCell>
                  <TableHeaderCell>Cantidad</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  clientsFiltered.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.Client.DOCUMENTO}</TableCell>
                      <TableCell>{item.Client.NOMBRES}</TableCell>
                      <TableCell>{item.Client.DIRECCION}</TableCell>
                      <TableCell>{item.Client.TELEFONO1}</TableCell>
                      <TableCell>{item.TOTALPREMIOS}</TableCell>
                      <TableCell>{item.CANT}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          )
        }
      </div>
    </section>
  )
}