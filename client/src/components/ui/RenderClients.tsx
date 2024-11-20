import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '../../components/Table';
import { Categorizacion } from '../../utils/contanst';
import { Cliente } from '../../types/Interfaces';
import { useNavigate } from 'react-router-dom';

export const RenderClients = ({ clientes } : { clientes: Cliente[] }) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHead className='bg-blue-100'>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Documento</TableHeaderCell>
          <TableHeaderCell>Telefono</TableHeaderCell>
          <TableHeaderCell>Correo</TableHeaderCell>
          <TableHeaderCell>Categoría</TableHeaderCell>
          <TableHeaderCell>Tipo Zona</TableHeaderCell>
          <TableHeaderCell>Acciones</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clientes.map((item) => (
          <TableRow key={item.DOCUMENTO}>
            <TableCell>{item.NOMBRES}</TableCell>
            <TableCell>{item.DOCUMENTO}</TableCell>
            <TableCell>{item.TELEFONO1}</TableCell>
            <TableCell>{item.EMAIL}</TableCell>
            <TableCell>{Categorizacion.find((cat) => cat.value === item.CATEGORIA)?.label}</TableCell>
            <TableCell>{item.TIPOZONA  ?? 'N/A'}</TableCell>
            <TableCell>
              <button onClick={() => navigate(`/editar-cliente/${item.DOCUMENTO}`)} className='px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-800 hover:bg-green-200 transition-colors'>Editar</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}