import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import PowerBi from '../connection/mysqldb'
import { Client } from './clientes.model';

class Premios extends Model<InferAttributes<Premios>, InferCreationAttributes<Premios>> {
  declare FECHAPAGO: Date;
  declare FECHASORTEO: Date;
  declare ZONA: string;
  declare CCOSTO: string;
  declare SERIE_KARDEX: string;
  declare SERIE_CONSECUTIVO: string
  declare TIPOJUEGO: string;
  declare TIPOPREMIO: string;
  declare CAJERO: string;
  declare TERCERO: string;
  declare PREMIO: number;
  declare RETEFUENTE: number;
  declare VERSION: string;
}

Premios.init({
  FECHAPAGO: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  FECHASORTEO: { type: DataTypes.DATE, allowNull: false },
  ZONA: { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
  CCOSTO: { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
  SERIE_KARDEX: { type: DataTypes.STRING(30), allowNull: false, primaryKey: true },
  SERIE_CONSECUTIVO: { type: DataTypes.STRING(30), allowNull: true, defaultValue: null },
  TIPOJUEGO: { type: DataTypes.STRING(10), allowNull: false },
  TIPOPREMIO: { type: DataTypes.STRING(15), allowNull: false },
  CAJERO: { type: DataTypes.STRING(15), allowNull: false },
  TERCERO: { type: DataTypes.STRING(15), allowNull: false },
  PREMIO: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  RETEFUENTE: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  VERSION: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null }
}, {
  sequelize: PowerBi,
  tableName: 'DETALLEPREMIOSCMP',
  timestamps: false
})

// TODO: Add the association between Premios and Client
Premios.belongsTo(Client, { foreignKey: 'TERCERO', targetKey: 'DOCUMENTO' })

export { Premios }
