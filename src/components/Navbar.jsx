import React from 'react';
import { Link } from 'react-router-dom';
import TriggerDarkMode from './TriggerDarkMode';
import ImagenLogo from 'components/ImagenLogo';


const Navbar = () => {
  return (
    <nav className='bg-green-500'>
      <ul className='flex w-full justify-between my-3'>
        <li> <div className='max-w-md w-full'>
      <ImagenLogo />
      </div>
            </li>
        <li>Navegacion 1</li>
        <li>Navegacion 2</li>
        <li>
          <TriggerDarkMode />
        </li>
        <li className='px-3'>
          <Link to='/login'>
            <button className='bg-blue-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Iniciar Sesión
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
