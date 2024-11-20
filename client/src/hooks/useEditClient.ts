import { URL_API_DATA } from '../utils/contanst';
import { Cliente } from '../types/Interfaces';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useEditClient = (id: string | undefined) => {
  const [cliente, setCliente] = useState<Cliente| null>(null);

  useEffect(() => {
    if (!id) return;

    axios.get(`${URL_API_DATA}/getCliente/${id}`)
      .then(res => {
        setCliente(res.data);
      })
      .catch(error => {
        console.error('Error fetching client:', error)
      })
  }, [id]);

  return { cliente };
}