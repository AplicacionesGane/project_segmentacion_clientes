import { Model, DataTypes, Optional } from 'sequelize';
import db_connection from '../connection/mysqldb';

interface ClienteAttributes {
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
  PEP: string | null;
  VERSION: string;
}

type ClienteCreationAttributes = Optional<ClienteAttributes, 'FECHACARGA' | 'DOCUMENTO'>;

class Client extends Model<ClienteAttributes, ClienteCreationAttributes> {
  declare FECHACARGA: Date;
  declare TIPODOCUMENTO: string;
  declare DOCUMENTO: string;
  declare NOMBRES: string;
  declare FECHANACIMIENTO: Date;
  declare CATEGORIA: string | null;
  declare DIRECCION: string;
  declare TIPOZONA: string | null;
  declare TELEFONO1: string;
  declare TELEFONO2: string | null;
  declare EMAIL: string;
  declare PEP: string | null;
  declare VERSION: string;
}

Client.init({
  FECHACARGA: { type: DataTypes.DATE, allowNull: false },
  TIPODOCUMENTO: { type: DataTypes.STRING, allowNull: false },
  DOCUMENTO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  NOMBRES: { type: DataTypes.STRING, allowNull: false },
  FECHANACIMIENTO: { type: DataTypes.DATE, allowNull: false },
  CATEGORIA: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  DIRECCION: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  TIPOZONA: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  TELEFONO1: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  TELEFONO2: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  EMAIL: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  PEP: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  VERSION: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
}, {
  sequelize: db_connection,
  tableName: 'TERCEROSCUMPLIMIENTO',
  timestamps: false
})

export { Client, ClienteAttributes };