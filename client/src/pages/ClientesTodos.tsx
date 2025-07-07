import { RenderFooterClients } from '@/components/ui/RenderFooterClients';
import { HeaderPagesClientes } from '@/components/ui/header-pages-clientes';
import { RenderClients } from '../components/ui/RenderClients';
import { useClientes } from '../hooks/useClientes';

function ClientesTodos() {
  const { page, setPage, setPageSize, totalClients, totalPages, search, setSearch } = useClientes({ url: 'clientes' });

  return (
    <section className='h-screen flex flex-col bg-gray-50'>

      {/* Header Section */}
      <HeaderPagesClientes
        totalClients={totalClients}
        search={search}
        setSearch={setSearch}
        setPageSize={setPageSize}
      />

      {/* ...existing code... */}
      <section className='flex-1 overflow-y-auto'>
        {/* <RenderClients clientes={clients} /> */}
      </section>

      <RenderFooterClients page={page} totalPages={totalPages} setPage={setPage} />

    </section>
  )
};

export default ClientesTodos;