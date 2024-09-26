import { Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/getUser';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';
import MyHeader from '../components/header/MyHeader';

const RootLayout = () => {
  const navigate = useNavigate();
  const login = getAccessToken();
  if (!login) navigate(paths.LOGIN);
  return (
    <main className='flex min-h-[100vh]'>
      <MyHeader />
      <div className='flex-1 bg-[#F2F2F2]'>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
