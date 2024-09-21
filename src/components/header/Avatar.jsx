import {
  BellOutlined,
  CloudDownloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, Space } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Avatar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div>
      <div
        onClick={showDrawer}
        className='w-9 h-9 border border-hidden rounded-full p-1 hover:cursor-pointer hover:border-primary  hover:border-solid transition-all cursor-pointer'>
        <img
          className='w-full'
          src='/favicon.ico'
          alt='favicon'
        />
      </div>

      <Drawer
        closeIcon={null}
        title=<h2 className='text-primary text-2xl'>Hồ sơ cá nhân</h2>
        onClose={onClose}
        open={open}>
        <Space direction='vertical'>
          <div className='flex gap-2'>
            <div className='w-24 h-24  transition-all '>
              <img
                className='w-full'
                src='/favicon.ico'
                alt='favicon'
              />
            </div>
            <div className='flex flex-col justify-center gap-2'>
              <h2 className='font-semibold text-base'>Name Name</h2>
              <p className='text-sm text-gray-500'>title title</p>
            </div>
          </div>
          <Divider />
          <Link
            to={'/account'}
            className='font-semibold'>
            <UserOutlined className='text-primary mr-2' /> Profile
          </Link>
          <Link
            to={'/account#'}
            className='font-semibold'>
            <BellOutlined className='text-primary mr-2' />
            Notifications
          </Link>
          <Link
            to={'/account#'}
            className='font-semibold'>
            <CloudDownloadOutlined className='text-primary mr-2' />
            Tickets
          </Link>
          <Divider />
          <Button onClick={handleLogout}>Login</Button>
        </Space>
      </Drawer>
    </div>
  );
};

export default Avatar;
