import {  useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

const navbars = [
  { label: 'Quản lý Servers', href: '/' },
  { label: 'Quản lý Sites', href: '/sites' },
  { label: 'Quản lý Backups', href: '/backups' },
  { label: 'DNS Manager', href: '/dnsmanager' },
  { label: 'Quản lý Files', href: '/files' },
  { label: 'Quản lý Users', href: '/users' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  return (
    <nav className='w-full'>
      <ul className='flex flex-col w-full gap-[1px]'>
        {navbars.map((nav, index) => (
          <li
            key={index}
            className={clsx(
              `p-[10px_24px] font-normal hover:bg-[#2C3138] cursor-pointer`,
              pathname === nav.href ?
                'hover:bg-[#2C3138] bg-[#2C3138]  text-white border-l-[2px] border-l-[#fd9900] font-medium' : 'text-[#d6d7d9]'
            )}
            onClick={()=>navigate(nav.href)}
            >
            <p
              className='text-nowrap text-[16px]'>
              {nav.label}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
