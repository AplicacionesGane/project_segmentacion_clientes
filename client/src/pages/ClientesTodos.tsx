import { SelectCantidadClientes } from '../components/ui/SelectCantClients';
import { RenderFooterClients } from '../components/ui/RenderFooterClients';
import { RenderClients } from '../components/ui/RenderClients';
import { useClientes } from '../hooks/useClientes';

function ClientesTodos() {
  const { clients, page, setPage, setPageSize, totalClients, totalPages, search, setSearch } = useClientes({ url: 'clientes' });

  return (
    <section className=''>

      <section className='flex py-2 justify-around'>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Clientes:</label>
          <span className='px-2 py-1 text-sm font-semibold text-gray-800 bg-yellow-400 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800'>{totalClients}</span>
        </div>

        <div className='flex items-center gap-2'>
          <label className='text-sm font-semibold'>Buscar:</label>
          <input type='text' value={search} placeholder='N° Documento' onChange={(ev) => setSearch(ev.target.value)}
            className='w-[200px] px-1 py-2 text-sm border border-gray-200 rounded-md dark:border-gray-800' />
        </div>

        <div className='flex items-center gap-2'>
          {/* <SelectCantidadClientes setPageSize={setPageSize} /> */}
        </div>
      </section>

      <section className='h-[90vh] overflow-y-auto'>
        {/* <RenderClients clientes={clients} /> */}
      </section>

      {/* <RenderFooterClients page={page} totalPages={totalPages} setPage={setPage} /> */}

    </section>
  )
};

export default ClientesTodos;