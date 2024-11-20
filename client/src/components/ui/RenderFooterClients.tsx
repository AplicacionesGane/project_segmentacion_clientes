interface PropsFooter {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const RenderFooterClients = ({ page, totalPages, setPage }: PropsFooter) => {
  return (
    <footer className='flex items-center justify-center py-1 bg-yellow-50 gap-2'>
      <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}
        className={` ${page === 1 ? 'hover:bg-red-200' : 'hover:bg-green-200'} px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800  transition-colors`}>
        Previous
      </button>

      <span>{page} de {totalPages}</span>

      <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}
        className={` ${page === totalPages ? 'hover:bg-red-200' : 'hover:bg-green-200'} px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800  transition-colors`} >
        Next
      </button>

    </footer>
  )
}