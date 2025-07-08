import { RenderFooterClients } from '@/components/ui/footer-clientes';
import { HeaderPagesClientes } from '@/components/ui/header-pages-clientes';
import { RenderClients } from '@/components/ui/render-clients-list';
import { useClientes } from '@/hooks/useClientes';

function ClientesTodos() {
  const {
    clients,
    totalClients,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    setPageSize,
  } = useClientes({ url: 'clientes' });

  return (
    <section className='h-screen flex flex-col bg-gray-50'>

      {/* Header Section */}
      <HeaderPagesClientes
        totalClients={totalClients}
        search={search}
        handlePageSizeChange={setPageSize}
        handleSearch={setSearch}
      />

      {/* ...existing code... */}
      <section className='flex-1 overflow-y-auto'>
        <RenderClients clientes={clients} />
      </section>

      <RenderFooterClients
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

    </section>
  )
};

export default ClientesTodos;