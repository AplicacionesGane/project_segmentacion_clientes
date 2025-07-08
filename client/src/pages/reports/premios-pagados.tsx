import { BottonExporOracleReport } from '@/components/ExportOracle';
import { HeaderReports } from './components/header-reports';
import { ReportOracleInterface } from '@/types/Interfaces';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Loading from '@/components/ui/LoadingComp';
import { formatPrice, municipioString } from '@/utils/funtions';
import { URL_API_DATA } from '@/utils/contanst';
import { FormEvent, useState } from 'react';
import { DollarSign, Search, Calendar, Hash, User, MapPin, Building, Clock, CreditCard, FileText } from 'lucide-react';
import axios from 'axios';

export default function ReportOracle() {
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ReportOracleInterface[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    setLoading(true);

    axios.post(`${URL_API_DATA}/oracle/report`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false))
  }

  // Filtrar datos basado en el término de búsqueda
  const filteredData = data.filter(item => 
    item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nombrecliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    municipioString(item.municipio).toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendedor.toString().includes(searchTerm) ||
    item.cliente.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <HeaderReports
        cantDates={filteredData.length}
        date1={date1}
        date2={date2}
        handleSubmit={handleSubmit}
        setDate1={setDate1}
        setDate2={setDate2}
        setZona={setZona}
        zona={zona}
      >
        <BottonExporOracleReport datos={filteredData} />
      </HeaderReports>

      <div>
        {data.length > 0 ? (
          <div className="space-y-4">
            {/* Filtros y estadísticas */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 max-w-md">
                    <Label htmlFor="search" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <Search size={16} />
                      Filtrar registros
                    </Label>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Buscar por nombres, serie, cliente, municipio..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                      <FileText size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Registros:</span>
                      <span className="text-sm font-bold text-blue-800 bg-white px-2 py-1 rounded">
                        {filteredData.length} de {data.length}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-sm font-medium text-green-700">Total:</span>
                      <span className="text-sm font-bold text-green-800 bg-white px-2 py-1 rounded">
                        {formatPrice(filteredData.reduce((sum, item) => sum + item.premio, 0))}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de datos */}
            <Card className="shadow-sm border-gray-200">
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            Fecha
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <Hash size={16} />
                            Serie
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <DollarSign size={16} />
                            Premio
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <User size={16} />
                            Vendedor
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            Nombres
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            Hora
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <Building size={16} />
                            Punto Pago
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            Municipio
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <CreditCard size={16} />
                            Cliente
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            Nombre Cliente
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item, index) => (
                        <TableRow 
                          key={index} 
                          className={`
                            hover:bg-gray-50 transition-colors duration-150
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          `}
                        >
                          <TableCell className="font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-gray-400" />
                              <span className="font-medium">{item.fechapago.split('T')[0]}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            <Badge variant="outline" className="font-medium bg-purple-50 text-purple-700 border-purple-200">
                              {item.serie}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold text-green-700">
                            {formatPrice(item.premio)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            <div className="flex items-center gap-2 justify-end">
                              <span className="font-semibold">{item.vendedor}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {item.nombres?.charAt(0).toUpperCase() || 'N'}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[150px]">
                                {item.nombres}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gray-400" />
                              <span className="font-medium">{item.hora}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-2">
                              <Building size={14} className="text-gray-400" />
                              <span className="font-medium">{item.punto_vta_pago}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
                              {municipioString(item.municipio)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <CreditCard size={14} className="text-gray-400" />
                              <span className="font-semibold">{item.cliente}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-medium">
                                  {item.nombrecliente?.charAt(0).toUpperCase() || 'C'}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 truncate max-w-[120px]">
                                {item.nombrecliente}
                              </span>
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
                Selecciona las fechas y la empresa, luego solicita el reporte para ver los premios pagados.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && <Loading />}
    </div>
  )
}