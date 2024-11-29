import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';

const ClienteNuevosPage = lazy(() => import('../pages/ClientesNuevos'));
const SeleccionReportes = lazy(() => import('../pages/SeleccionReportes'));
const ReportClienteGanadores = lazy(() => import('../pages/ReporteClientGan'));
const ClienteTodosPage = lazy(() => import('../pages/ClientesTodos'));
const EditarClientePage = lazy(() => import('../pages/EditarCliente'));
const ReportesPage = lazy(() => import('../pages/ReportesPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const ReportCobrados = lazy(() => import('../pages/ReportCobrados'));
const ReportMayores = lazy(() => import('../pages/ReportMayores'));
const ReportLaft = lazy(() => import('../pages/ReportLaft'));
const ResportOracle = lazy(() => import('../pages/ReporteOracle'));


export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><ClienteTodosPage /></Suspense>
      },
      {
        path: 'clientes-nuevos',
        element: <Suspense fallback={<div>Loading...</div>}><ClienteNuevosPage /></Suspense>
      },
      {
        path: 'editar-cliente/:id',
        element: <Suspense fallback={<div>Loading...</div>}><EditarClientePage /></Suspense>
      },
      {
        path: 'dashboard',
        element: <Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>
      },
      {
        path: 'reportes',
        element: <Suspense fallback={<div>Loading...</div>}><SeleccionReportes /></Suspense>
      },
      {
        path: 'reportBaloto',
        element: <Suspense fallback={<div>Loading...</div>}><ReportesPage /></Suspense>
      },
      {
        path: 'reportClientGanadores',
        element: <Suspense fallback={<div>Loading...</div>}><ReportClienteGanadores /></Suspense>
      },
      {
        path: 'reportCobrados',
        element: <Suspense fallback={<div>Loading...</div>}><ReportCobrados /></Suspense>
      },
      {
        path: 'reportPremiosMayores',
        element: <Suspense fallback={<div>Loading...</div>}><ReportMayores /></Suspense>
      },
      {
        path: 'reporteLAFT',
        element: <Suspense fallback={<div>Loading...</div>}><ReportLaft /></Suspense>
      },
      {
        path: 'reportOracle',
        element: <Suspense fallback={<div>Loading...</div>}><ResportOracle /></Suspense>
      }
    ]
  }
]);