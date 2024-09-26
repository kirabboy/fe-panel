/* eslint-disable no-unused-vars */
import { UserSwitchOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { changePasswrodUserApi } from '../../../api/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalResetPassword = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Gửi dữ liệu lên server để cập nhật mật khẩu
        const { confirm, ...rest } = values;
        try {
          setIsLoding(true);
          const res = await changePasswrodUserApi(rest);
          if (res?.statusCode === 201) {
            toast.success('Đổi mật khẩu thành công.');
            setIsModalOpen(false);
            localStorage.clear();
            navigate('/login');
          }
        } catch (e) {
          toast.error(e?.message);
        } finally {
          setIsLoding(false);
        }

        // setIsModalOpen(false);
      })
      .catch((info) => {
        console.log('Validate Failed: ', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type='link'
        onClick={showModal}>
        Quên mật khẩu
      </Button>
      <Modal
        className='!w-[600px]'
        title={<h2 className='text-lg font-bold'>Quên mật khẩu</h2>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key='back'
            onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={isLoding}
            onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}>
        <Divider />
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete='off'>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Vui lòng nhập email hợp lệ',
              },
            ]}>
            <Input
              type='email'
              placeholder='Nhập email của bạn'
            />
          </Form.Item>

          <Divider />
        </Form>
      </Modal>
    </>
  );
};

export default ModalResetPassword;
