import { Button, Divider, Drawer, Space } from 'antd';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/hooks/ContextUser';
import ModalChangePassword from './auth/ModalChangePassword';
import ModalProfile from './auth/ModalProfile';

import { UserOutlined } from '@ant-design/icons';

const Avatar = () => {
  const { user } = useContext(UserContext);
  console.log({ user });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        shape='circle'>
        <UserOutlined className='text-xl' />
      </Button>

      <Drawer
        closeIcon={null}
        title=<h2 className='text-primary text-2xl'>Hồ sơ cá nhân</h2>
        onClose={onClose}
        open={open}>
        <Space
          direction='vertical'
          className='w-full'>
          <div className='flex gap-2'>
            <UserOutlined className='text-8xl' />
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='font-semibold text-lg'>{user?.name}</h2>
              <p className='text-base text-gray-500 uppercase'>
                {user?.roles[0]}
              </p>
            </div>
          </div>
          <Divider />
          <ModalProfile />
          <ModalChangePassword />
          <Divider />
          <Button onClick={handleLogout}>Login</Button>
        </Space>
      </Drawer>
    </>
  );
};

export default Avatar;
