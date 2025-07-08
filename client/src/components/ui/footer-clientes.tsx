import { ChevronLeft, ChevronRight } from "lucide-react"

interface PropsFooter {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const RenderFooterClients = ({ page, totalPages, setPage }: PropsFooter) => {
  return (
    <footer className='flex items-center justify-between py-4 bg-white border-t border-gray-200 shadow-sm'>
      {/* Previous Button */}
      <button 
        disabled={page === 1} 
        onClick={() => setPage((prev) => prev - 1)}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer
          ${page === 1 
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <ChevronLeft size={16} />
        <span>Anterior</span>
      </button>

      {/* Page Indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-blue-700">
            Página {page} de {totalPages}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <button 
        disabled={page === totalPages} 
        onClick={() => setPage((prev) => prev + 1)}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer
          ${page === totalPages 
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <span>Siguiente</span>
        <ChevronRight size={16} />
      </button>
    </footer>
  )
}