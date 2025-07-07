import { RiArchiveStackFill, RiArticleFill, RiGroupLine, RiGuideFill, RiDatabaseLine } from "@remixicon/react";
import { useNavigate } from "react-router";

const reports = [
  {
    id: 'baloto',
    title: 'Reporte Baloto',
    description: 'Genera la información de los premios pagados con el producto Baloto Miloto y Colorloto. Se debe seleccionar rango de fechas para la consulta.',
    icon: <img src="/logoBaloto.webp" alt="logo de baloto" width={56} height={56} className="object-contain" />,
    gradient: 'from-blue-600 to-cyan-600',
    route: '/reportBaloto'
  },
  {
    id: 'ganadores',
    title: 'Clientes Más Ganadores',
    description: 'Permite mediante el número de cédula, conocer los clientes que más han ganado en premios. Se debe seleccionar rango de fechas para la consulta.',
    icon: <RiGroupLine size={56} className="text-white" />,
    gradient: 'from-emerald-600 to-green-600',
    route: '/reportClientGanadores'
  },
  {
    id: 'cobrados',
    title: 'Cobrados por Colocadores',
    description: 'Genera la información de los premios cobrados por colocadores. Se debe seleccionar rango de fechas para la consulta.',
    icon: <RiGuideFill size={56} className="text-white" />,
    gradient: 'from-rose-600 to-pink-600',
    route: '/reportCobrados'
  },
  {
    id: 'mayores',
    title: 'Premios Mayores 15UVT',
    description: 'Genera la información de los premios mayores 15UVT. Se debe seleccionar rango de fechas para la consulta.',
    icon: <RiArticleFill size={56} className="text-white" />,
    gradient: 'from-indigo-600 to-purple-600',
    route: '/reportPremiosMayores'
  },
  {
    id: 'laft',
    title: 'Reporte LAFT-FPADM',
    description: 'Genera la información de LAFT-FPADM. Se debe seleccionar rango de fechas para la consulta.',
    icon: <RiArchiveStackFill size={56} className="text-white" />,
    gradient: 'from-orange-600 to-amber-600',
    route: '/ReporteLAFT'
  },
  {
    id: 'oracle',
    title: 'Reporte Premios Pagados en PDV (CP2) Oracle',
    description: 'Genera la información de los premios pagados en PDV (CP2) Oracle. Se debe seleccionar rango de fechas para la consulta y empresa.',
    icon: <RiDatabaseLine size={56} className="text-white" />,
    gradient: 'from-violet-600 to-purple-600',
    route: '/reportOracle'
  }
];

export default function SeleccionReportes() {
  const navigate = useNavigate();

  return (
    <section className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Sistema de Reportes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona el tipo de reporte que deseas generar. Cada módulo cuenta con filtros específicos para personalizar tu consulta.
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {reports.map((report) => (
            <article
              key={report.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${report.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                    {report.icon}
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-gray-900 transition-colors">
                      {report.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-600 text-base leading-relaxed">
                    {report.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => navigate(report.route)}
                    className={`w-full bg-gradient-to-r ${report.gradient} text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group-hover:shadow-2xl`}
                  >
                    <span>Acceder al Reporte</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 opacity-10">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${report.gradient}`}></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}