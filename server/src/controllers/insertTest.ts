import { Client, ClienteAttributes } from '../models/clientes.model';
import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';

const cantidad = 1000;

export const insertTest = async (req: Request, res: Response) => {
  try {
    const data: ClienteAttributes[] = [];

    Array.from({ length: cantidad }).forEach(() => {
      data.push({
        FECHACARGA: faker.date.recent(),
        TIPODOCUMENTO: 'CC',
        DOCUMENTO: faker.number.int({ min: 0, max: 999999990}).toString(),
        NOMBRES: faker.person.firstName(),
        FECHANACIMIENTO: faker.date.past(),
        CATEGORIA: null,
        DIRECCION: faker.location.streetAddress(),
        TIPOZONA: null,
        TELEFONO1: faker.phone.number(),
        TELEFONO2: null,
        EMAIL: faker.internet.email(),
        PEP: null,
        VERSION: ''
      })
    });

    await Client.sync();
    await Client.bulkCreate(data);

    res.status(200).json({ message: 'Datos insertados' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}