import { ConsultaResultAttrib } from '../types/interface';

export const generateData = (result: ConsultaResultAttrib) => [
  { id: 1, label: `${result.Menor} - Menor a 15 UVT`, value: parseInt(result.Menor.toString()) },
  { id: 2, label: `${result.Rango} - Entre 15 y 48 UVT`, value: parseInt(result.Rango.toString()) },
  { id: 3, label: `${result.Mayor} - Mayor a 48 UVT`, value: parseInt(result.Mayor.toString()) }
];