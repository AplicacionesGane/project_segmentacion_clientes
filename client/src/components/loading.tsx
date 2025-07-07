export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  )
}