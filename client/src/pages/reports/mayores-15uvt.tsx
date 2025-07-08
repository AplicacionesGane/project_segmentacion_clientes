import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, User, FileText, Hash, DollarSign, Calendar, MapPin, CreditCard } from 'lucide-react';
import { BottonExporMayores } from '@/components/ExportarMayores';
import { HeaderReports } from './components/header-reports';
import { Card, CardContent } from '@/components/ui/card';
import { FormEvent, useMemo, useState } from 'react';
import { ReportMayores } from '@/types/Interfaces';
import Loading from '@/components/ui/LoadingComp';
import { URL_API_DATA } from '@/utils/contanst';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import axios from 'axios';

export default function ReportesPage() {
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [filter, setFilter] = useState<string>('')

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ReportMayores[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    setLoading(true);

    axios.post(`${URL_API_DATA}/reporMayores`, { fecha1: date1.toString().slice(0, 10), fecha2: date2.toString().slice(0, 10), zona })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      }).finally(() => setLoading(false));
  }

  const filteredData = useMemo(() => {
    if (!data) return null
    return data.filter(item => item.TERCERO.includes(filter))
  }, [data, filter])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
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
        <BottonExporMayores datos={data} />
      </HeaderReports>

      <div className='flex-1 px-2'>
        {data.length > 0 ? (
          <div className="space-y-2">
            {/* Filtro de búsqueda */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4">
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
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
                    <User size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Filtrados:</span>
                    <span className="text-sm font-bold text-purple-800 bg-white px-2 py-1 rounded">
                      {filteredData?.length || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de datos */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-0">
                <div className='max-h-[calc(100vh-300px)] overflow-y-auto'>
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow className="bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100">
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <FileText size={16} />
                            Tipo Doc.
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <Hash size={16} />
                            Documento
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            Nombres
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            Serie Kardex
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <Hash size={16} />
                            Serie Consecutivo
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            Total Premios
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            Código DANE
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-purple-200">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Fecha Pago
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData?.map((item, index) => (
                        <TableRow 
                          key={index} 
                          className={`
                            hover:bg-gray-50 transition-colors duration-150
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <TableCell>
                            <Badge variant="outline" className="font-medium text-xs">
                              {item.Client.TIPODOCUMENTO}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm font-medium text-gray-900">
                            {item.TERCERO}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {item.Client.NOMBRES?.charAt(0).toUpperCase() || 'N'}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[150px]">
                                {item.Client.NOMBRES}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-gray-700">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                              {item.SERIE_KARDEX}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-gray-700">
                            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                              {item.SERIE_CONSECUTIVO}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-bold text-green-700">
                            {formatCurrency(Number(item.TOTAL_PREMIOS))}
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-gray-400" />
                              <span className="font-medium">{item.COD_DANE}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="font-medium">{formatDate(item.FECHAPAGO)}</span>
                            </div>
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
                <DollarSign size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
              <p className="text-gray-500 text-center">
                Selecciona las fechas y la empresa, luego solicita el reporte para ver los premios mayores a 15UVT.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && <Loading />}
    </section>
  )
}