import { URL_API_LOGIN } from '../utils/contanst'
import { Button } from '../components/ui/button'
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
    <section className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>

      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen'>

        <div className='w-full max-w-md'>

          <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden'>

            <div className='h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'></div>
            
            <div className='px-8 py-10'>

              <div className='text-center mb-8'>
                <figure className='flex justify-center mb-6'>
                  <div className='p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm'>
                    <img width={160} src='/gane.webp' alt='logo' className='drop-shadow-sm' />
                  </div>
                </figure>
                
                <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                  Segmentación Clientes
                </h1>
                <p className='text-gray-500 text-sm'>
                  Ingresa tus credenciales para acceder al sistema
                </p>
              </div>

              <form className='space-y-6' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Usuario
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                      </svg>
                    </div>
                    <input 
                      className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white'
                      onChange={ev => setUsername(ev.target.value)} 
                      type='text' 
                      placeholder='CP1118******' 
                      required 
                      value={username} 
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700'>
                    Contraseña
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                      </svg>
                    </div>
                    <input 
                      className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white'
                      onChange={ev => setPassword(ev.target.value)} 
                      type='password' 
                      placeholder='••••••••' 
                      required 
                      value={password} 
                    />
                  </div>
                </div>

                <div className='pt-4'>
                  <Button
                    disabled={loading}
                    type='submit'
                    className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer'
                  >
                    {
                      loading ? (
                        <div className='flex items-center justify-center gap-3'>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                          </svg>
                          <span>Iniciando sesión...</span>
                        </div>
                      ) : (
                        <span className='flex items-center justify-center gap-2'>
                          <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                          </svg>
                          Iniciar Sesión
                        </span>
                      )
                    }
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className='text-center mt-8'>
            <p className='text-sm text-gray-500'>
              © {new Date().getFullYear()} Sistema de Segmentación de Clientes
            </p>
          </div>
        </div>
      </div>

      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </section>
  )
}

export default LoginPage