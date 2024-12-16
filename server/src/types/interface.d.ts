export interface ConsultaResultAttrib {
  Menor: string
  Rango: string
  Mayor: string
}

export type RowType = [
  string, // FECHAPAGO
  string, // SERIE
  number, // PREMIO
  string, // VENDEDOR
  string, // HORA
  number, // SUCURSAL
  number, // PUNTO_VTA_PAGO
  string, // NOMBRES
  string, // NOMBRECLIENTE
  number  // MUNICIPIO
];