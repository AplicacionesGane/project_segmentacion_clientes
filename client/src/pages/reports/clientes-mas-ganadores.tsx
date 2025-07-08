import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, User, MapPin, Phone, DollarSign, Hash, Search } from 'lucide-react';
import { BottonExporClientGanador } from '@/components/ExportClientGanador';
import { HeaderReports } from './components/header-reports';
import { Card, CardContent } from '@/components/ui/card';
import { FormEvent, useEffect, useState } from 'react';
import Loading from '@/components/ui/LoadingComp';
import { DataCliente } from '@/types/Interfaces';
import { URL_API_DATA } from '@/utils/contanst';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

export default function ReportClienteGanadores() {
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataCliente[]>([]);

  const [clientsFiltered, setClientsFiltered] = useState<DataCliente[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    setLoading(true);

    axios.post(`${URL_API_DATA}/reporClientGanadores`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setClientsFiltered(data.filter(item => item.Client.DOCUMENTO.includes(filter)));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

  return (
    <section className='flex flex-col min-h-screen bg-gray-50'>

      <HeaderReports 
        cantDates={data.length}
        date1={date1}
        date2={date2}
        handleSubmit={handleSubmit}
        setDate1={setDate1}
        setDate2={setDate2}
        setZona={setZona}
        zona={zona}
      >
        <BottonExporClientGanador datos={data} />
      </HeaderReports>

      <div className='px-2'>
        {data.length > 0 ? (
          <div className="space-y-1">
            {/* Filtro de búsqueda */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="px-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-md">
                    <Label htmlFor="filter" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Search size={16} />
                      Filtrar por documento
                    </Label>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="filter"
                        type="text"
                        placeholder="Buscar por número de documento..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                    <User size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">Filtrados:</span>
                    <span className="text-sm font-bold text-green-800 bg-white px-2 py-1 rounded">
                      {clientsFiltered.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de datos */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-0">
                <div className='max-h-[calc(100vh-270px)] overflow-y-auto'>
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100">
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <FileText size={16} />
                            Documento
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            Nombre
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            Dirección
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <Phone size={16} />
                            Teléfono
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            Total Premios
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-green-200">
                          <div className="flex items-center gap-2">
                            <Hash size={16} />
                            Cantidad
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientsFiltered.map((item, index) => (
                        <TableRow 
                          key={index} 
                          className={`
                            hover:bg-gray-50 transition-colors duration-150
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <TableCell className="font-mono text-sm font-medium text-gray-900">
                            {item.Client.DOCUMENTO}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {item.Client.NOMBRES?.charAt(0).toUpperCase() || 'N'}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[200px]">
                                {item.Client.NOMBRES}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-2 max-w-[250px]">
                              <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                              <span className="truncate text-sm">{item.Client.DIRECCION}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {item.Client.TELEFONO1 ? (
                              <div className="flex items-center gap-2">
                                <Phone size={14} className="text-gray-400" />
                                <span className="font-medium">{item.Client.TELEFONO1}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="font-bold text-green-700">
                            {formatCurrency(Number(item.TOTALPREMIOS))}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-semibold"
                            >
                              {item.CANT}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-sm border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <User size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
              <p className="text-gray-500 text-center">
                Selecciona las fechas y la empresa, luego solicita el reporte para ver los clientes ganadores.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && <Loading />}
    </section>
  )
}