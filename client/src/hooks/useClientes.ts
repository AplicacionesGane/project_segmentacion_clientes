import { type Cliente, type DataResponse } from '../types/Interfaces';
import { URL_API_DATA } from '../utils/contanst';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useClientes = ({ url }: { url: string }) => {
  const [totalClients, setTotalClients] = useState(0);
  const [clients, setClients] = useState<Cliente[]>([]);
  const [pageSize, setPageSize] = useState(100);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get<DataResponse>(`${URL_API_DATA}/${url}?page=${page}&pageSize=${pageSize}&search=${search}`)
      .then((response) => {
        if(response.status === 200){
          setClients(response.data.clients);
          setTotalClients(response.data.count);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
  }, [page, pageSize, url, reload, search]);

  const totalPages = Math.ceil(totalClients / pageSize);

  return { clients, totalClients, error, setPageSize, page, setPage, totalPages, setReload, search, setSearch, reload };
}