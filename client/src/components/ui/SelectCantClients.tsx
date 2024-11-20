import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/Select';
import { CantidadDatos } from '../../utils/contanst';

export const SelectCantidadClientes = ({ setPageSize }: { setPageSize: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <>
      <label className='text-sm font-semibold'>Mostrar:</label>
      <Select defaultValue={'100'} onValueChange={value => setPageSize(parseInt(value))}>
        <SelectTrigger className='mx-auto w-[120px]'>
          <SelectValue placeholder='Select' />
        </SelectTrigger>
        <SelectContent>
          {CantidadDatos.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <span className='flex justify-between gap-x-2'>
                <item.icon className='size-4 shrink-0 text-gray-500 dark:text-gray-500' aria-hidden='true' />
                {item.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}