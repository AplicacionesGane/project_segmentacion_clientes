export interface Cliente {
  FECHACARGA: Date;
  TIPODOCUMENTO: string;
  DOCUMENTO: string;
  NOMBRES: string;
  FECHANACIMIENTO: Date;
  CATEGORIA: string | null;
  DIRECCION: string;
  TIPOZONA: string | null;
  TELEFONO1: string;
  TELEFONO2: string | null;
  EMAIL: string;
  PEP: string;
  VERSION: string;
}

export interface DataResponse {
  count: number;
  clients: Cliente[];
  page: number;
  pageSize: number;
}

export interface User {
  id: string;
  names: string,
  lastnames: string,
  username: string,
  email: string,
  company: string,
  process: string,
  sub_process: string,
}

export interface ReportDataBaloto {
  CAJERO: string
  FECHAPAGO: string
  PREMIO: number
  RETEFUENTE: number
  SERIE_CONSECUTIVO: string
  TERCERO: string
  TIPOPREMIO: string
  ZONA: string
}

export interface DataCliente {
  TOTALPREMIOS: string;
  CANT:         number;
  Client:       Client;
}

export interface Client {
  DOCUMENTO: string;
  NOMBRES:   string;
  DIRECCION: string;
  TELEFONO1: string;
}