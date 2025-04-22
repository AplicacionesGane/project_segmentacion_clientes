import { URL_API_LOGIN } from '../utils/contanst'
import { useAuth } from '../auth/AuthContext'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

function LoginPage() {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    axios.post(`${URL_API_LOGIN}/login`, { username, password })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          toast.error('Error de conexión, y/o Red, contacte al administrador del sistema', { description: 'No se pudo iniciar session' })
          return
        }

        if (error.response.status === 400 || error.response.status === 401) {
          toast.error(error.response.data.message, { description: error.response.data.description })
          return
        }
      })
  }

  return (
    <section className=''>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-transparent/15 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='px-14 py-16'>
            <figure className='flex justify-center mb-6 text-2xl font-semibold text-gray-900 '>
              <img width={180} src='/gane.webp' alt='logo' />
            </figure>
            <h1 className='text-lg text-center pb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
              Segmentación Clientes
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 '>Usuario:</label>
                <input className='bg-gray-50 rounded-lg  block w-full p-2.5 outline-blue-400'
                  onChange={ev => setUsername(ev.target.value)} type='text' placeholder='CP1118******' required value={username} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 '>Contraseña</label>
                <input className='bg-gray-50 rounded-lg  block w-full p-2.5 outline-blue-400' 
                 onChange={ev => setPassword(ev.target.value)} type='password' placeholder='••••••••' required value={password}   />
              </div>


              <button className='w-full px-4 py-3 text-sm font-medium tracking-wider text-white uppercase bg-blue-600 rounded-lg    hover:bg-blue-700 active:bg-blue-700'>Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>

      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </section>
  )
}

export default LoginPage