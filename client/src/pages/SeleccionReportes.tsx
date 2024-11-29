import { RiArchiveStackFill, RiArticleFill, RiGroupLine, RiGuideFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function SeleccionReportes() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-4 gap-4 p-4">

      <article className='flex flex-col justify-around bg-gradient-to-r from-cyan-900 to-blue-800 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Reporte Baloto</h1>
        <p className='text-white text-balance'>
          Genera la información de los premios pagados con el producto Baloto Miloto y Colorloto. Se debe seleccionar rango de fechas para la consulta.
        </p>
        <div className='flex items-center justify-between'>
          <img src="/logoBaloto.webp" alt="logo de baloto" width={120} />
          <button onClick={() => navigate('/reportBaloto')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

      <article className='flex flex-col justify-around bg-gradient-to-r from-green-900 to-green-800 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Clientes Más Ganadores</h1>
        <p className='text-white text-balance'>
          Permite mediante el número de cédula, conocer los clientes que más han ganado en premios. Se debe seleccionar rango de fechas para la consulta.
        </p>
        <div className='flex items-center justify-between'>
          <RiGroupLine size={48} color='white' />
          <button onClick={() => navigate('/reportClientGanadores')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>


      <article className='flex flex-col justify-around bg-gradient-to-r from-red-900 to-red-500 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Cobrados por Colocadores</h1>
        <p className='text-white text-balance'>
          Genera la información de los premios cobrados por colocadores. Se debe seleccionar rango de fechas para la consulta.
        </p>
        <div className='flex items-center justify-between'>
          <RiGuideFill size={48} color='white' />
          <button onClick={() => navigate('/reportCobrados')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

      <article className='flex flex-col justify-around bg-gradient-to-r from-indigo-900 to-indigo-500 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>premios mayores 15UVT</h1>
        <p className='text-white text-balance'>
          Genera la información de los premios mayores 15UVT. Se debe seleccionar rango de fechas para la consulta.
        </p>
        <div className='flex items-center justify-between'>
          <RiArticleFill  size={48} color='white' />
          <button onClick={() => navigate('/reportPremiosMayores')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>
      
      <article className='flex flex-col justify-around bg-gradient-to-r from-orange-900 to-orange-500 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Reporte LAFT-FPADM</h1>
        <p className='text-white text-balance'>
          Genera la información de LAFT-FPADM. Se debe seleccionar rango de fechas para la consulta.
        </p>
        <div className='flex items-center justify-between'>
          <RiArchiveStackFill   size={48} color='white' />
          <button onClick={() => navigate('/ReporteLAFT')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

      <article className='flex flex-col justify-around bg-gradient-to-r from-red-900 to-red-500 p-4 rounded-md shadow-xl space-y-2'>
        <h1 className='font-semibold text-2xl text-white'>Reporte Premios Pagados en PDV (CP2) Oracle</h1>
        <p className='text-white text-balance'>
          Genera la información de los premios pagados en PDV (CP2) Oracle. Se debe seleccionar rango de fechas para la consulta y empresa
        </p>
        <div className='flex items-center justify-between'>
          <RiArchiveStackFill   size={48} color='white' />
          <button onClick={() => navigate('/ReporteLAFT')}
            className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md font-semibold'>Ingresar</button>
        </div>
      </article>

    </section>
  );
}