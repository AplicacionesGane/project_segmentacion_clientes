import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Dispatch, FormEvent, ReactNode } from "react"
import { Calendar, Building2, Database, FileText } from "lucide-react"

interface ReportDataBaloto {
  zona: string | undefined
  date1: string | undefined
  date2: string | undefined
  handleSubmit: (e: FormEvent) => void
  setDate1: Dispatch<React.SetStateAction<string | undefined>>
  setDate2: Dispatch<React.SetStateAction<string | undefined>>
  setZona: Dispatch<React.SetStateAction<string | undefined>>
  cantDates: number
  children?: ReactNode
}

export const HeaderReports = ({ cantDates, date1, date2, handleSubmit, setDate1, setDate2, setZona, zona, children} : ReportDataBaloto) => {
  return (
    <Card className="m-2 p-2 border-gray-200">
      <CardContent className="px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Filtros de Fecha */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2 flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 pt-2">
                <Calendar size={16} />
                Fecha Inicial:
              </Label>
              <Input
                type="date"
                value={date1}
                onChange={ev => setDate1(ev.target.value)}
                className="w-full sm:w-auto"
              />
            </div>

            <div className="space-y-2 flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 pt-2">
                <Calendar size={16} />
                Fecha Final:
              </Label>
              <Input
                type="date"
                value={date2}
                onChange={ev => setDate2(ev.target.value)}
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Formulario de Empresa y Solicitud */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex items-center gap-2 w-full sm:w-auto">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 pt-2">
                <Building2 size={16} />
                Empresa:
              </Label>
              <Select value={zona} onValueChange={(value) => setZona(value)}>
                <SelectTrigger className="w-full sm:w-52">
                  <SelectValue placeholder="Seleccione Empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Seleccione Empresa</SelectItem>
                  <SelectItem value="39627">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      Multired
                    </div>
                  </SelectItem>
                  <SelectItem value="39628">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} />
                      Servired
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
            >
              <FileText size={16} className="mr-2" />
              Buscar Información
            </Button>
          </form>

          {/* Información y Acciones */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Contador de Datos */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <Database size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Registros:</span>
              <span className="text-sm font-bold text-blue-800 bg-white px-2 py-1 rounded">
                {cantDates.toLocaleString()}
              </span>
            </div>

            {/* Botón de Exportación (Children) */}
            {children && (
              <div className="flex items-center">
                {children}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}