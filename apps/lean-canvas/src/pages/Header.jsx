import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaEnvelope, FaTimes, FaBars } from 'react-icons/fa';

import { useState } from 'react';

export default function Header() {
  const navItems = [
    { id: 'home', label: 'Home', icon: <FaHome />, href: '/' },
    { id: 'about', label: 'About', icon: <FaInfoCircle />, href: '/about' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, href: '/contact' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-gray-800 text-white px-4 sticky top-0 z-30'>
      <div className='container mx-auto flex justify-between items-center h-14'>
        <div>
          <Link to='/' className='font-bold text-xl'>
            Lean Canvas
          </Link>
        </div>
        <nav className='hidden md:flex space-x-4'>
          {navItems.map(item => (
            <NavLink key={item.id} className='hover:text-gray-300' to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 모바일 - 햄버거 */}
        <button className='md:hidden flex flex-col space-y-1 p-2' onClick={toggleMenu}>
          <FaBars />
        </button>

        {/* 모바일 - 메뉴 */}
        <aside
          className={`md:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 transfrom transition-transfrom duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className={`flex flex-col space-y-4 p-4 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <button onClick={toggleMenu}>
              <FaTimes className='h-6 w-6' />
            </button>
            {navItems.map(item => (
              <NavLink key={item.id} className='hover:text-gray-300' to={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </aside>

        <button className='hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
          lecture
        </button>
      </div>
    </header>
  );
}
