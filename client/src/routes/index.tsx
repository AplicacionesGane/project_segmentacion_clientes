import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import Root from './Root';

import Loading from '@/components/loading'

const ClienteNuevosPage = lazy(() => import('@/pages/ClientesNuevos'));
const SeleccionReportes = lazy(() => import('@/pages/SeleccionReportes'));
const ClienteTodosPage = lazy(() => import('@/pages/ClientesTodos'));
const EditarClientePage = lazy(() => import('@/pages/EditarCliente'));
const ReporteBaloto = lazy(() => import('@/pages/reports/baloto'));
const ReportClienteGanadores = lazy(() => import('@/pages/reports/clientes-mas-ganadores'));
const ReportCobrados = lazy(() => import('@/pages/reports/cobrados-colocador'));

// const Dashboard = lazy(() => import('@/pages/Dashboard'));
// const ReportMayores = lazy(() => import('@/pages/ReportMayores'));
// const ReportLaft = lazy(() => import('@/pages/ReportLaft'));
// const ResportOracle = lazy(() => import('@/pages/ReporteOracle'));


export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><ClienteTodosPage /></Suspense>
      },
      {
        path: 'reportes',
        element: <Suspense fallback={<Loading />}><SeleccionReportes /></Suspense>
      },

      {
        path: 'clientes-nuevos',
        element: <Suspense fallback={<Loading />}><ClienteNuevosPage /></Suspense>
      },
      {
        path: 'editar-cliente/:id',
        element: <Suspense fallback={<Loading />}><EditarClientePage /></Suspense>
      },
      {
        path: 'reportBaloto',
        element: <Suspense fallback={<Loading />}><ReporteBaloto /></Suspense>
      },
      {
        path: 'reportClientGanadores',
        element: <Suspense fallback={<Loading />}><ReportClienteGanadores /></Suspense>
      },
      {
        path: 'reportCobrados',
        element: <Suspense fallback={<Loading />}><ReportCobrados /></Suspense>
      },
      /*
      {
        path: 'dashboard',
        element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>
      },
      {
        path: 'reportPremiosMayores',
        element: <Suspense fallback={<Loading />}><ReportMayores /></Suspense>
      },
      {
        path: 'reporteLAFT',
        element: <Suspense fallback={<Loading />}><ReportLaft /></Suspense>
      },
      {
        path: 'reportOracle',
        element: <Suspense fallback={<Loading />}><ResportOracle /></Suspense>
      }
      */
    ]
  }
]);