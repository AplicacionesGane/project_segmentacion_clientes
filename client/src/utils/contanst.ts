import { RiDatabase2Line } from '@remixicon/react';

export const CantidadDatos = [
  {
    value: '20',
    label: '20',
    icon: RiDatabase2Line
  },
  {
    value: '50',
    label: '50',
    icon: RiDatabase2Line
  },
  {
    value: '100',
    label: '100',
    icon: RiDatabase2Line
  },
  {
    value: '200',
    label: '200',
    icon: RiDatabase2Line
  },
]

export const Categorizacion = [
  { value: null, label: 'null' },
  { value: 'CL', label: 'Cliente' },
  { value: 'TR', label: 'Trabajador' },
  { value: 'AC', label: 'Accionista' },
  { value: 'CI', label: 'Colocador Independiente' },
  { value: 'CC', label: 'Cajero Comercial' }
]

export const TipoZona = [
  { value: null, label: 'null' },
  { value: 'N/A', label: 'N/A' },
  { value: 'URBANO', label: 'URBANO' },
  { value: 'RURAL', label: 'RURAL' }
]

export const URL_API_LOGIN = import.meta.env.VITE_URL_API_LOGIN as string;
export const URL_API_DATA = import.meta.env.VITE_URL_API_DATA as string;