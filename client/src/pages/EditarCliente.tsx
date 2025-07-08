import { User, FileText, MapPin, Phone, Mail, Calendar, Home, Shield, Save, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Categorizacion, TipoZona, URL_API_DATA } from '@/utils/contanst'
import { useEditClient } from '@/hooks/useEditClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { useRef } from 'react';
import axios from 'axios';

function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const { cliente } = useEditClient(id);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target as HTMLFormElement))

    const { categoria, tipozona, documento } = fields;
    if (!categoria || !tipozona || !documento) {
      alert('Los Campos categoría y tipo de zona son obligatorios');
      return;
    }

    axios.post(`${URL_API_DATA}/updateCliente`, { categoria, tipozona, documento })
      .then(res => {
        console.log(res)
        toast.success('Cliente actualizado correctamente', { description: 'Cambio de información del cliente' });
        setTimeout(() => {
          formRef.current?.reset();
        }, 5000);
      })
      .catch(error => {
        console.error('Error updating client:', error)
        toast.error('Error al actualizar cliente', { description: 'Cambio de información del cliente' });
      });
  }

  if (!cliente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cliente no encontrado</h3>
            <p className="text-gray-600 text-center">No se pudo encontrar el cliente solicitado. Verifique el ID e intente nuevamente.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
              <p className="text-gray-600">Actualiza la información del cliente seleccionado</p>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">

          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Información Personal
              </CardTitle>
              <CardDescription>
                Datos básicos del cliente (solo lectura)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombres" className="flex items-center gap-2">
                    <User size={16} />
                    Nombres
                  </Label>
                  <Input
                    id="nombres"
                    name="nombres"
                    defaultValue={cliente.NOMBRES}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documento" className="flex items-center gap-2">
                    <FileText size={16} />
                    Documento
                  </Label>
                  <Input
                    id="documento"
                    name="documento"
                    defaultValue={cliente.DOCUMENTO}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipodocumento" className="flex items-center gap-2">
                    <FileText size={16} />
                    Tipo de documento
                  </Label>
                  <Input
                    id="tipodocumento"
                    name="tipodocumento"
                    defaultValue={cliente.TIPODOCUMENTO}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechanacimiento" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Fecha de nacimiento
                  </Label>
                  <Input
                    id="fechanacimiento"
                    name="fechanacimiento"
                    defaultValue={cliente.FECHANACIMIENTO.toString()}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pep" className="flex items-center gap-2">
                    <Shield size={16} />
                    PEP
                  </Label>
                  <Input
                    id="pep"
                    name="pep"
                    defaultValue={cliente.PEP}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fechacarga" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Fecha de carga
                  </Label>
                  <Input
                    id="fechacarga"
                    name="fechacarga"
                    defaultValue={cliente.FECHACARGA.toString()}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone size={20} />
                Información de Contacto
              </CardTitle>
              <CardDescription>
                Datos de contacto del cliente (solo lectura)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="direccion" className="flex items-center gap-2">
                    <Home size={16} />
                    Dirección
                  </Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    defaultValue={cliente.DIRECCION}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} />
                    Correo
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={cliente.EMAIL}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono1" className="flex items-center gap-2">
                    <Phone size={16} />
                    Teléfono 1
                  </Label>
                  <Input
                    id="telefono1"
                    name="telefono1"
                    defaultValue={cliente.TELEFONO1}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono2" className="flex items-center gap-2">
                    <Phone size={16} />
                    Teléfono 2
                  </Label>
                  <Input
                    id="telefono2"
                    name="telefono2"
                    defaultValue={cliente.TELEFONO2 || ''}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Editable */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <MapPin size={20} />
                Información Editable
              </CardTitle>
              <CardDescription>
                Campos que pueden ser modificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="categoria" className="flex items-center gap-2 font-medium">
                    <User size={16} />
                    Categoría *
                  </Label>
                  <Select defaultValue="null" name="categoria">
                    <SelectTrigger id="categoria" className="w-full">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {Categorizacion.map((item, index) => (
                        <SelectItem key={index} value={item.value || 'ninguno'}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipozona" className="flex items-center gap-2 font-medium">
                    <MapPin size={16} />
                    Tipo de zona *
                  </Label>
                  <Select defaultValue="null" name="tipozona">
                    <SelectTrigger id="tipozona" className="w-full">
                      <SelectValue placeholder="Seleccione tipo de zona" />
                    </SelectTrigger>
                    <SelectContent>
                      {TipoZona.map((item, index) => (
                        <SelectItem key={index} value={item.value || 'ninguno'}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>

            <div className="flex justify-end pr-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <Save size={16} className="" />
                Guardar Cambios
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default EditarCliente;