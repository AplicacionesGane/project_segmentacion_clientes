import { Dispatch, SetStateAction } from 'react';
import { Calendar } from '../Calendar';
import { es } from 'date-fns/locale';

export const CalendarLocaleExample = (
  { value, onChange }: 
  { value: Date | undefined, onChange: Dispatch<SetStateAction<Date | undefined>> }
) => {
  return (
    <div className='flex flex-col items-center gap-y-4'>
      <Calendar locale={es} selected={value} onSelect={onChange} className='bg-gray-100 border border-gray-300'/>
    </div>
  )
}