import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Hash, DollarSign, Calculator, User, Calendar, Building2 } from 'lucide-react';
import { HeaderReports } from '@/pages/reports/components/header-reports';
import { Card, CardContent } from '@/components/ui/card';
import { ReportDataBaloto } from '@/types/Interfaces';
import Loading from '@/components/ui/LoadingComp';
import { URL_API_DATA } from '@/utils/contanst';
import { FormEvent, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

export default function ReporteBaloto() {
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)

  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<ReportDataBaloto[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      alert('Debe seleccionar las fechas y la empresa');
      return;
    }

    setLoading(true);

    axios.post(`${URL_API_DATA}/reportBaloto`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

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
    <section className=''>

      <HeaderReports 
        cantDates={data.length}
        date1={date1}
        date2={date2}
        handleSubmit={handleSubmit}
        setDate1={setDate1}
        setDate2={setDate2}
        setZona={setZona}
        zona={zona}
      />

      <div className='h-[90vh] overflow-y-auto px-2 '>
        {data.length > 0 ? (
          <Card className="mx-2 shadow-sm border-gray-200">
            <CardContent className="p-0">
              <div className=''>
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <Hash size={16} />
                          Serie Consecutivo
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <FileText size={16} />
                          Tipo Premio
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          Valor Premio
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <Calculator size={16} />
                          Retención
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          Cajero
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Fecha Pago
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          Tercero
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-gray-800 border-b-2 border-blue-200">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} />
                          Empresa
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow 
                        key={index} 
                        className={`
                          hover:bg-gray-50 transition-colors duration-150
                          ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                        `}
                      >
                        <TableCell className="font-mono text-sm font-medium text-gray-900">
                          {item.SERIE_CONSECUTIVO}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {item.TIPOPREMIO}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-700">
                          {formatCurrency(Number(item.PREMIO))}
                        </TableCell>
                        <TableCell className="font-semibold text-red-600">
                          {formatCurrency(Number(item.RETEFUENTE))}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <span className=''>{item.CAJERO ?? ' - '}</span>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="font-medium">{formatDate(item.FECHAPAGO)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 font-medium">
                          {item.TERCERO}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.ZONA === '39627' ? 'default' : 'secondary'}
                            className={`
                              ${item.ZONA === '39627' 
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                              }
                            `}
                          >
                            <Building2 size={12} className="mr-1" />
                            {item.ZONA === '39627' ? 'Multired' : 'Servired'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
              <p className="text-gray-500 text-center">
                Selecciona las fechas y la empresa, luego solicita el reporte para ver los datos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && <Loading />}

    </section>
  )
}