import { type Cliente, type DataResponse } from '@/types/Interfaces';
import { useEffect, useState, useCallback } from 'react';
import { URL_API_DATA } from '@/utils/contanst';
import axios from 'axios';

interface UseClientesState {
  clients: Cliente[];
  totalClients: number;
  loading: boolean;
  error: string | null;
}

export const useClientes = ({ url }: { url: string }) => {
  const [state, setState] = useState<UseClientesState>({
    clients: [],
    totalClients: 0,
    loading: true,
    error: null
  });
  
  const [pageSize, setPageSize] = useState(100);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce para la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Reset page cuando cambie la búsqueda
  useEffect(() => {
    if (debouncedSearch !== search) {
      setPage(1);
    }
  }, [debouncedSearch, search]);

  const fetchClients = useCallback(async (signal: AbortSignal) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.get<DataResponse>(
        `${URL_API_DATA}/${url}?page=${page}&pageSize=${pageSize}&search=${debouncedSearch}`,
        { signal }
      );

      if (response.status === 200) {
        setState(prev => ({
          ...prev,
          clients: response.data.clients,
          totalClients: response.data.count,
          loading: false,
          error: null
        }));
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
        return;
      }
      
      console.error('Error fetching clients:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }));
    }
  }, [url, page, pageSize, debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();
    fetchClients(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchClients, reload]);

  const totalPages = Math.ceil(state.totalClients / pageSize);

  const handleReload = useCallback(() => {
    setReload(prev => !prev);
  }, []);

  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset a la primera página cuando cambie el tamaño
  }, []);

  return {
    clients: state.clients,
    totalClients: state.totalClients,
    loading: state.loading,
    error: state.error,
    page,
    totalPages,
    pageSize,
    search,
    reload,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    setSearch: handleSearchChange,
    setReload: handleReload
  };
}