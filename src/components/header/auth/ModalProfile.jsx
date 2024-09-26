import { UserAddOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Modal, Radio } from 'antd';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import validatePhoneNumber from '@/utils/validatePhoneNumber';
import validateDOB from '@/utils/validateDOB';
import { UserContext } from '@/hooks/ContextUser';
import { updateProfileApi } from '@/api/user';
import formatDate from '@/utils/formatDate';
import { toast } from 'react-toastify';

const ModalProfile = () => {
  const { user } = useContext(UserContext);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    user && form.setFieldsValue({ ...user, dob: moment(user?.dob) });
    return () => {};
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Gửi dữ liệu lên server để cập nhật mật khẩu
        try {
          const date = formatDate(new Date(values?.dob));
          setIsLoding(true);
          const res = await updateProfileApi({ ...values, dob: date });
          if (res?.statusCode === 200) {
            toast.success('Đổi mật khẩu thành công.');
            localStorage.setItem('user', JSON.stringify(res?.data));
            setIsModalOpen(false);
          }
        } catch (e) {
          toast.error(e?.message);
        } finally {
          setIsLoding(false);
        }
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
        <UserAddOutlined />
        Thông tin cá nhân
      </Button>
      <Modal
        open={isModalOpen}
        title='Update Profile'
        onCancel={handleCancel}
        footer={[
          <Button
            key='cancel'
            onClick={handleCancel}>
            Đóng
          </Button>,
          <Button
            loading={isLoding}
            key='submit'
            type='primary'
            onClick={handleOk}>
            Lưu
          </Button>,
        ]}>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'>
          <Form.Item
            label='Tên'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name='mobileNumber'
            label='Số điện thoại'
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { validator: validatePhoneNumber },
            ]}>
            <Input
              placeholder='+85577342526'
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='gender'
            label='Giới tính'
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
            <Radio.Group name='gender'>
              <Radio value={'male'}>Nam</Radio>
              <Radio value={'female'}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name='dob'
            label='Ngày sinh'
            rules={[
              { required: true, message: 'Vui lòng chọn ngày sinh' },
              { validator: validateDOB },
            ]}>
            <DatePicker
              placeholder='2005-03-13'
              showNow={false}
              minDate={moment('1990/1/1')}
              maxDate={moment('2007/1/1')}
            />
          </Form.Item>
          <Divider />
        </Form>
        <Divider />
      </Modal>
    </>
  );
};

export default ModalProfile;
