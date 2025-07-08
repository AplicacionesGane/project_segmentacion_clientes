import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Database } from 'lucide-react';

export function SelectCantidadClientes({ setPageSize }: { setPageSize: React.Dispatch<React.SetStateAction<number>> }) {
  const options = [
    { value: '20', label: '20 registros' },
    { value: '50', label: '50 registros' },
    { value: '100', label: '100 registros' },
    { value: '200', label: '200 registros' },
  ]

  return (
    <Select defaultValue='100' onValueChange={(value) => setPageSize(Number(value))}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='100 registros' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className='flex items-center gap-2'>
                <Database size={16} />
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
