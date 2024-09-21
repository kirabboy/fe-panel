import { Input, Space, Form, Button, message } from 'antd';
import { loginAPI } from '../api/login.js';
import { useNavigate } from 'react-router-dom';
const AuthForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    try {
      const res = await loginAPI(value);
      console.log({ res });
      if (res?.access_token) {
        localStorage.setItem('access_token', res?.access_token);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      message.error(e.message);
    }
  };
  return (
    <div className='flex justify-center w-full'>
      <Form
        onFinish={onFinish}
        className='w-full lg:w-full xl:w-[600px]'
        form={form}
        layout='vertical'
        name='login'>
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
