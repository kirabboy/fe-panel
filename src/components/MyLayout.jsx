import { Outlet } from 'react-router-dom';
import MyHeader from './header/MyHeader';

const MyLayout = () => {
  return (
    <main className='flex min-h-[100vh]'>
      <MyHeader />
     <div className='p-[16px] flex-1'> <Outlet /></div>
    </main>
  );
};

export default MyLayout;
