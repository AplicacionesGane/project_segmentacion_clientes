import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Calendar, Building2 } from "lucide-react";
import { ChartBarHorizontal } from "@/components/chat-bar-horizontal";
import { CompanyData, CompanyData2 } from "@/types/Interfaces";
import { ChartPieDonut } from "@/components/chart-pie-donut";
import LoadingComponent from "@/components/ui/LoadingComp";
import { URL_API_DATA } from "@/utils/contanst";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [chartData1, setChartData1] = useState<CompanyData[]>([])
  const [chartData2, setChartData2] = useState<CompanyData2>({} as CompanyData2)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [response1, response2] = await Promise.all([
        axios.get<CompanyData[]>(`${URL_API_DATA}/getInfo?fecha=${date?.toISOString()}`),
        axios.get<CompanyData2>(`${URL_API_DATA}/getInfo2?fecha=${date?.toISOString()}`),
      ])

      setChartData1(response1.data)
      setChartData2(response2.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <div className="">
      <div className="bg-gray-100 border-b flex items-center justify-center gap-4 py-4">
        <Calendar className="h-6 w-6 text-blue-600" />
        <Label className="w-32 text-center">Fecha de análisis</Label>
        <Input
          id="dashboard-date"
          type="date"
          value={date?.toISOString().split('T')[0] || ''}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-44"
          style={{ minWidth: 0 }}
        />
      </div>

      <main className="h-[calc(100vh-5rem)] overflow-y-auto p-4 space-y-6">
        {/* Sección de gráficos circulares */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <PieChart className="h-6 w-6 text-gray-700" />
              <div>
                <CardTitle className="text-xl text-gray-900">
                  Distribución de Premios por Empresa
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Análisis detallado de premios por rango UVT
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
              {chartData1.length > 0 && (
                chartData1.map((empresa) => (
                  <div key={empresa.empresa} className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                      <Building2 className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {empresa.empresa}
                      </h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {empresa.data.reduce((sum, item) => sum + item.value, 0)} premios
                      </Badge>
                    </div>
                    <ChartPieDonut
                      key={empresa.empresa}
                      empresa={empresa.empresa}
                      data={empresa.data}
                    />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sección de gráficos de barras */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-gray-700" />
              <div>
                <CardTitle className="text-xl text-gray-900">
                  Análisis Comparativo por Tipo de Premio
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Comparación horizontal de premios entre empresas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Multired</h3>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    Empresa principal
                  </Badge>
                </div>
                <ChartBarHorizontal data={chartData2.Multired} title="Multired" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Servired</h3>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    Empresa principal
                  </Badge>
                </div>
                <ChartBarHorizontal data={chartData2.Servired} title="Servired" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {
        loading && (
          <LoadingComponent />
        )
      }
    </div>
  )
}