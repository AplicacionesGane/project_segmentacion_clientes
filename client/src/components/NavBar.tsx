import { RiHome2Line, RiGroupLine, RiUserAddLine, RiLogoutBoxLine, RiFileChartLine } from '@remixicon/react';
import { LogoutAndDeleteToken } from '../services/LogOut';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function NavBar() {
  const { setIsAuthenticated } = useAuth();

  const handleClick = () => {
    LogoutAndDeleteToken()
      .then(res => {
        console.log(res);
        setIsAuthenticated(false);
      })
  }

  return (
    <nav className='border-r px-2 py-4 flex flex-col justify-between items-center gap-6 h-screen'>
      <div className='flex flex-col items-center gap-2'>
        <ul className=''>
          <li className='flex flex-col gap-2'>
            <NavLink title='Dashboard' to='dashboard' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
              <RiHome2Line size={32} />
            </NavLink>
            <NavLink title='Todos los clientes' to='/' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
              <RiGroupLine size={32} />
            </NavLink>
            <NavLink title='Clientes Nuevos' to='clientes-nuevos' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
              <RiUserAddLine size={32} />
            </NavLink>
            <NavLink title='Reportes' to='reportes' className={({ isActive }) => isActive ? 'bg-blue-800 text-white rounded-full p-2' : 'bg-gray-200 rounded-full p-2'}>
              <RiFileChartLine size={32} />
            </NavLink>
          </li>
        </ul>
      </div>

      <button title='Cerrar Sesión' onClick={() => handleClick()}
        className='hover:bg-blue-700 hover:text-white border rounded-full p-2'>
        <RiLogoutBoxLine size={32} />
      </button>

    </nav>
  )
}

export default NavBar;