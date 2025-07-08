import { HeaderPagesClientes } from '@/components/ui/header-pages-clientes';
import { RenderFooterClients } from '../components/ui/footer-clientes';
import { RenderClients } from '@/components/ui/render-clients-list';
import { useClientes } from '../hooks/useClientes';

function ClientesNuevos() {
  const { clients, page, setPage, setPageSize, totalClients, totalPages, search, setSearch } = useClientes({ url: 'clientesNuevos' });

  return (
    <section className='h-screen flex flex-col bg-gray-50'>
      
      <HeaderPagesClientes
        totalClients={totalClients}
        search={search}
        setSearch={setSearch}
        setPageSize={setPageSize}
        title='Clientes Nuevos'
      />

      <section className='flex-1 overflow-y-auto'>
        <RenderClients clientes={clients} />
      </section>

      <RenderFooterClients page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  )
}

export default ClientesNuevos;