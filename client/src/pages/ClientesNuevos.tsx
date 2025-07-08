import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../components/Table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/Select';
import { SelectCantidadClientes } from '../components/ui/select-can-clientes';
import { RenderFooterClients } from '../components/ui/RenderFooterClients';
import { Categorizacion, TipoZona, URL_API_DATA } from '../utils/contanst';

import { useClientes } from '../hooks/useClientes';
import { useNavigate } from 'react-router';
import { Label } from '../components/Label';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { HeaderPagesClientes } from '@/components/ui/header-pages-clientes';
import { RenderClients } from '@/components/ui/RenderClients';

function ClientesNuevos() {
  const { clients, page, setPage, setPageSize, setReload, totalClients, totalPages, search, setSearch, reload } = useClientes({ url: 'clientesNuevos' });
  const [categoria, setCategoria] = useState<string | undefined>(undefined);
  const [tipozona, setTipoZona] = useState<string | undefined>(undefined);
  const [identificaciones, setIdentificaciones] = useState<string[]>([]);
  const [showEdition, setShowEdition] = useState(false);
  const checkboxesRef = useRef<HTMLInputElement[]>([]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setIdentificaciones([...identificaciones, value]);
    } else {
      setIdentificaciones(identificaciones.filter((id) => id !== value));
    }
  };

  const limpiarSeleccion = () => {
    checkboxesRef.current.forEach((checkbox) => {
      if (checkbox) {
        checkbox.checked = false;
      }
    });
    setIdentificaciones([]);
    setShowEdition(false);
  };
  
  const navigate = useNavigate();

  const handleSubmitMasivo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`${URL_API_DATA}/updateClientes`, { categoria, tipozona, documentos: identificaciones })
      .then(response => {
        console.log(response.data);
        toast.success('Datos actualizados correctamente');
        setTimeout(() => { limpiarSeleccion(); setReload(!reload); setCategoria(undefined); setTipoZona(undefined) }, 3000);
      })
      .catch(error => {
        console.error('Error updating clients:', error);
        toast.error('Error al actualizar los datos');
      })
  }

  return (
    <section className='h-screen flex flex-col bg-gray-50'>

      <section className='flex py-2 justify-around'>
        <HeaderPagesClientes
          totalClients={totalClients}
          search={search}
          setSearch={setSearch}
          setPageSize={setPageSize}
          title='Clientes Nuevos'
        />
      </section>

      {/* ...existing code... */}
      <section className='flex-1 overflow-y-auto'>
        <RenderClients clientes={clients} />
      </section>


      {
        showEdition && (
          <section className='flex p-4 gap-4 absolute top-14 bg-white border shadow-md rounded-md items-center min-w-[550px]'>
            <button onClick={() => setShowEdition(false)} className='absolute top-2 right-2 text-lg font-semibold hover:text-red-400 text-gray-800 dark:text-gray-100'>
              X
            </button>
            <div className='relative flex w-1/2 flex-col rounded-md gap-1 h-[60vh] overflow-y-auto'>
              <h1 className='text-center font-semibold sticky top-0 bg-white'>Documentos</h1>
              {
                identificaciones.map((id) => (
                  <div className='flex justify-around'>
                    <span key={id} className='px-2 py-1 text-sm border-b'>{id}</span>
                    {/* <button onClick={() => handleRemoveDocument(id) } className='border rounded-full p-1 hover:bg-red-200 transition-all' title='eliminar'>
                      <RiDeleteBinLine />
                    </button> */}
                  </div>
                ))
              }
            </div>
            {/* <form className='space-y-4 w-1/2' onSubmit={handleSubmitMasivo}>
              <div>
                <Label>Cetegoría</Label>
                <Select defaultValue={categoria} name='categoria' onValueChange={value => setCategoria(value)}>
                  <SelectTrigger className='mx-auto'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    {Categorizacion.map((item) => (
                      <SelectItem key={item.value} value={item.value || 'N/A'}>
                        <span className='flex justify-between gap-x-2'>
                          {item.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tipo de zona</Label>
                <Select defaultValue={tipozona} name='tipozona' onValueChange={value => setTipoZona(value)}>
                  <SelectTrigger className='mx-auto'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent>
                    {TipoZona.map((item) => (
                      <SelectItem key={item.value} value={item.value || 'N/A'}>
                        <span className='flex justify-between gap-x-2'>
                          {item.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button type='submit' className='w-full bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded'>
                Actualizar
              </button>
            </form> */}
          </section>
        )
      }
      <RenderFooterClients page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  )
}

export default ClientesNuevos;