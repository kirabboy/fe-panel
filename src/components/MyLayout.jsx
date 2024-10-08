import { Outlet } from 'react-router-dom';
import MyHeader from './header/MyHeader';
import { getAccessToken } from '../utils/getUser';
import { useNavigate } from 'react-router-dom';
import paths from '../utils/paths';

const MyLayout = () => {
  const navigate = useNavigate();
  const login = getAccessToken();
  if (!login) navigate(paths.LOGIN);
  return (
    <main className="flex min-h-[100vh]">
      <MyHeader />
      <div className="p-[1.5rem] flex-1 bg-[#F2F2F2]">
        <Outlet />
      </div>
    </main>
  );
};

export default MyLayout;
