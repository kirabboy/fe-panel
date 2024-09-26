/* eslint-disable no-unused-vars */
import { SwitcherOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { changePasswrodUserApi } from '../../../api/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalChangePassword = () => {
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
        <SwitcherOutlined />
        Đổi mật khẩu
      </Button>
      <Modal
        className='!w-[600px]'
        title={<h2 className='text-lg font-bold'>Đổi mật khẩu</h2>}
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
            label='Mật khẩu cũ'
            name='oldPassword'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
              { min: 6, message: 'Mật khẩu từ 6 ký tự' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Mật khẩu mới'
            name='newPassword'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu từ 6 ký tự' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Xác nhận mật khẩu mới'
            name='confirm'
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu từ 6 ký tự' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Hai mật khẩu không khớp!');
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
          <Divider />
        </Form>
      </Modal>
    </>
  );
};

export default ModalChangePassword;
