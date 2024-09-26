import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navbars = [
  { label: 'Quản lý Servers', href: '/' },
  { label: 'Quản lý Sites', href: '/sites' },
  { label: 'Quản lý Backups', href: '/backups' },
  { label: 'DNS Manager', href: '/dnsmanager' },
  { label: 'Quản lý Files', href: '/files' },
  { label: 'Quản lý Users', href: '/users' },
  { label: 'Quản lý Teams', href: '/teams' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className='w-full'>
      <ul className='flex flex-col w-full gap-2'>
        {navbars.map((nav, index) => (
          <li
            key={index}
            className={clsx(
              `text-white cursor- hover:text-black border border-none  font-semibold hover:bg-orange-100 px-2 py-1 rounded-md`,
              pathname === nav.href &&
                'hover:bg-orange-400 border px-2 py-1 rounded-md bg-orange-400  hover:text-white'
            )}>
            <Link
              to={nav.href}
              className=''>
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
