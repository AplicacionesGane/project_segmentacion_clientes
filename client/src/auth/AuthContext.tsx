import { createContext, useContext, useEffect, useState, Dispatch, ReactNode, SetStateAction } from 'react'
import { URL_API_LOGIN, APP_NAME } from '../utils/contanst'
import { LogoutAndDeleteToken } from '../services/LogOut'
import { type User } from '../types/Interfaces'
import axios from 'axios'

interface IAuthContext {
  isAuthenticated: boolean
  user: User
  setUser: Dispatch<SetStateAction<User>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const InitialUser: User = { username: '', email: '', names: '', lastnames: '', company: '', process: '', sub_process: '', id: '' }

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(InitialUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(InitialUser)
      return
    }

    axios.get(`${URL_API_LOGIN}/profile`, { params: { app: APP_NAME } })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          LogoutAndDeleteToken()
          setIsAuthenticated(false)
          setUser(InitialUser)
        }
      })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}