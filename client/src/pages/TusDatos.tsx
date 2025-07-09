import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AlertCircle } from "lucide-react";

import { URL_API_DATA } from "@/utils/contanst";
import { Card } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PropsData {
  doc: string,
  typedoc: string,
  fechaE?: string,
  nombres?: string,
}

interface Information {
  email: string,
  doc: number,
  jobid: string,
  nombre: string,
  typedoc: string,
  validado: boolean
}

interface DataResponse {
  message: string,
  data: Information,
}

const fetchData = async (sendInfo: PropsData) => {
  try {
    const response = await axios.post<DataResponse>(`${URL_API_DATA}/tus-datos/launch`, sendInfo)
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default function TusDatos() {
  const [data, setData] = useState<Information | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PropsData>({
    doc: "",
    typedoc: "",
    fechaE: "",
    nombres: ""
  })

  const handleFetchData = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    setLoading(true)
    setError(null)

    if (!formData.doc || !formData.typedoc) {
      setError("Tipo de documento y número de documento son obligatorios")
      setLoading(false)
      return
    }

    const fechaExp = formData.fechaE ? new Date(formData.fechaE).toISOString() : undefined;
    const nombresSend = formData.nombres ? formData.nombres : undefined;

    try {
      const result = await fetchData({
        doc: formData.doc,
        typedoc: formData.typedoc,
        fechaE: fechaExp,
        nombres: nombresSend
      })

      console.log(result);
      setData(result.data)
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4 m-2">
      <h1 className="text-2xl font-bold mb-4">Tus Datos</h1>

      <form onSubmit={handleFetchData} className="flex gap-2">

        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor="typedoc">Tipo de Documento</Label>
          <Select value={formData.typedoc} onValueChange={(value) => setFormData({ ...formData, typedoc: value })}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Seleccione Tipo Documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CC">Cedula Ciudadania</SelectItem>
                <SelectItem value="CE">Cedula Extranjera</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor="doc">N° Documento</Label>
          <Input
            id="doc"
            name="doc"
            placeholder="1118*******"
            className="w-[15rem]"
            value={formData.doc}
            onChange={(e) => setFormData({ ...formData, doc: e.target.value })}
          />
        </div>

        <div className="flex justify-center items-center" title="Este campo es opcional">
          <AlertCircle className="text-blue-400" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor="fechaE">Fecha de Expedición</Label>
          <Input
            id="fechaE"
            name="fechaE"
            type="date"
            value={formData.fechaE}
            onChange={(e) => setFormData({ ...formData, fechaE: e.target.value })}
          />
        </div>

        <div className="flex justify-center items-center" title="Este campo es opcional">
          <AlertCircle className="text-blue-400" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor="nombres">Nombres</Label>
          <Input
            id="nombres"
            name="nombres"
            placeholder="Ingrese nombres"
            className="w-[15rem]"
            value={formData.nombres}
            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Label> Acción: </Label>
          <Button type="submit">Enviar</Button>
        </div>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <Card className="mt-4 p-4">
          <h2 className="text-xl font-bold mb-2">Datos del Cliente</h2>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Documento:</strong> {data.doc}</p>
          <p><strong>Job ID:</strong> {data.jobid}</p>
          <p><strong>Nombre:</strong> {data.nombre}</p>
          <p><strong>Tipo de Documento:</strong> {data.typedoc}</p>
          <p><strong>Validado:</strong> {data.validado ? "Sí" : "No"}</p>
        </Card>
      )}
    </Card>
  )
}
