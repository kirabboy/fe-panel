import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Select,
} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import ROLES from '@/utils/roles.js';
import formatDate from '@/utils/formatDate';
import {} from '@/api/user.js';
import { createaUserApi } from '@/api/user.js';
import validateEmail from '@/utils/validateEmail';
import validatePhoneNumber from '@/utils/validatePhoneNumber ';

const ModalAddUser = ({ isModalOpen, showModal, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const date = formatDate(new Date(values?.dob));

    try {
      const res = await createaUserApi({ ...values, dob: date });

      if (res?.error) {
        message.error(res?.message);
      } else {
        message.success('Tạo thành công');
        handleOk();
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
      message.error(e?.message);
    }
  };

  return (
    <>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        onClick={showModal}>
        Thêm người dùng
      </Button>
      <Modal
        title={
          <>
            <h2 className='text-xl'>Thêm Người Dùng</h2>
          </>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <Divider />

        <Form
          name='basic'
          form={form}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            gender: 'male',
            role: 'user',
          }}
          onFinish={onFinish}
          autoComplete='off'>
          <Form.Item
            name='userName'
            label='UserName'
            rules={[{ required: true, message: 'Vui lòng nhập user name' }]}>
            <Input
              placeholder='Nhập tên người dùng'
              allowClear
            />
          </Form.Item>
          <Form.Item
            name='name'
            label='Tên'
            rules={[{ required: true, message: 'Vui lòng nhập user ten' }]}>
            <Input
              placeholder='Nhập tên người dùng'
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { validator: validateEmail },
            ]}>
            <Input
              placeholder='Nhập email công việc'
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='Mật khẩu'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Phải ít nhất 6 ký tự' },
            ]}>
            <Input.Password
              placeholder='Nhập mật khẩu'
              allowClear
            />
          </Form.Item>

          <Form.Item
            name='role'
            label='Phân quyền'
            rules={[{ required: true, message: 'Vui chọn quyền' }]}>
            <Select
              placeholder='Chọn phân quyền'
              options={ROLES}
            />
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
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item className='flex justify-end'>
            <Button
              type='primary'
              htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider />
      </Modal>
    </>
  );
};

export default ModalAddUser;
