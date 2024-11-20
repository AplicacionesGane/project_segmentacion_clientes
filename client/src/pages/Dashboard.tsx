import { CalendarLocaleExample } from '../components/ui/SelectDate';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '../components/BarChart';
import { URL_API_DATA } from '../utils/contanst';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataCompany {
  id: number,
  value: number,
  label: string
}

interface DataCompany2 {
  TIPOPREMIO: string
  CANT: number
}

interface Data {
  empresa: string,
  data: DataCompany[],
}

interface Data2 {
  Multired: DataCompany2[],
  Servired: DataCompany2[],
}

export default function Dashboard() {
  const [data, setData] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data2>();
  const [date, setDate] = useState<Date | undefined>(undefined)

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get(`${URL_API_DATA}/getInfo?fecha=${date?.toISOString()}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    axios.get(`${URL_API_DATA}/getInfo2?fecha=${date?.toISOString()}`)
      .then(res => {
        setData2(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [date])

  return (
    <div className='w-full flex flex-col relative'>

      <div className='flex items-center mx-2 pt-2 gap-2'>
        <button onClick={() => setVisible(!visible)} className={`${ visible ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600' } text-white p-2 rounded-md w-40`}>
          {
            visible ? 'Ocultar' : 'Calendario'
          }
        </button>
        <h2>
          <span className='font-semibold'>Información:</span> {date?.toISOString().slice(0, 10) || 'Día Actual'}
        </h2>
      </div>

      <div className='absolute left-2 top-14 z-50'>
        {
          visible && (
            <CalendarLocaleExample
              value={date}
              onChange={setDate}
            />
          )
        }
      </div>
      <section className='flex'>
        {
          data.map((item, index) => (
            <div key={index} className='w-1/2 flex flex-col justify-center items-center p-2 space-y-2 rounded-md m-2'>
              <h1 className='text-2xl font-bold'>{item.empresa}</h1>
              <PieChart
                series={[{
                  data: item.data,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  innerRadius: 70,
                  outerRadius: 100,
                  cornerRadius: 10,
                }]}
                height={200}
                width={550}
              />
            </div>
          ))
        }
      </section>

      <section className='w-full'>
        <h2 className='text-center font-semibold uppercase'>
          Cantidad de premios por tipo de premio
        </h2>
        {
          data2 && (
            data2.Multired.length > 0 && (
              <section className='flex justify-around'>
                <div className='w-[40%]'>
                  <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Multired Premios
                  </p>
                  <BarChart
                    title='Multired'
                    className='h-80'
                    data={data2.Multired}
                    index='TIPOPREMIO'
                    categories={['CANT']}
                    yAxisWidth={80}
                    layout='vertical'
                  />
                </div>
                <div className='w-[40%]'>
                  <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
                    Servired Premios
                  </p>
                  <BarChart
                    title='Servired'
                    className='h-80'
                    data={data2.Servired}
                    index='TIPOPREMIO'
                    categories={['CANT']}
                    yAxisWidth={80}
                    layout='vertical'
                  />
                </div>

              </section>
            )
          )
        }
      </section>
    </div>
  )
}