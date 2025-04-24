import { URL_API_LOGIN } from '../utils/contanst'
import { Button } from '../components/ui/Button'
import { useAuth } from '../auth/AuthContext'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'

function LoginPage() {
  const { setIsAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true)

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
      .finally(() => {
        setLoading(false)
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
                  onChange={ev => setPassword(ev.target.value)} type='password' placeholder='••••••••' required value={password} />
              </div>


              <Button
                disabled={loading}
                type='submit'
              >
                {
                  loading ? <div className='flex items-center justify-center gap-2'>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                    </svg>
                    Iniciando ...</div> : 'Iniciar Sesion'
                }
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </section>
  )
}

export default LoginPage