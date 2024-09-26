import { Input, Space, Form, Button } from 'antd';
import { loginAPI } from '@/api/login.js';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/hooks/ContextUser.jsx';

import { USER_LOGIN_LOCAL_STORAGE } from '@/utils/contants.js';
import { toast } from 'react-toastify';
import variables from '../utils/variables.js';
const AuthForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setUserInformation } = useContext(UserContext);
  const onFinish = async (value) => {
    try {
      const res = await loginAPI(value);

      if (res?.access_token) {
        setUserInformation(res?.user);
        localStorage.setItem(variables.ACCESS_TOKEN, res?.access_token);
        localStorage.setItem(
          USER_LOGIN_LOCAL_STORAGE,
          JSON.stringify(res?.user)
        );
        localStorage.setItem(variables.ROLE, 'ADMIN');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.message);
    }
  };
  return (
    <div className='flex justify-center w-full'>
      <Form
        onFinish={onFinish}
        className='w-full lg:w-full xl:w-[600px]'
        form={form}
        layout='vertical'>
        <Form.Item
          className='text-sm font-bold'
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}>
          <Input
            className='font-medium '
            size='large'
            placeholder='Nhập email'
          />
        </Form.Item>

        <Form.Item
          className='text-sm font-bold '
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            { min: 6, message: 'Mật khẩu từ 6 ký tự' },
          ]}>
          <Input.Password
            className='font-medium '
            size='large'
            placeholder='Nhập password'
          />
        </Form.Item>

        <Space className='w-full flex justify-center mt-12'>
          <Button
            htmlType='submit'
            type='primary'
            size='large'>
            Đăng nhập
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default AuthForm;
