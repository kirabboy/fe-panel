import { Outlet } from 'react-router-dom';
import MyHeader from './header/MyHeader';

const MyLayout = () => {
  return (
    <main className='flex'>
      <MyHeader />
      <Outlet />
    </main>
  );
};

export default MyLayout;
