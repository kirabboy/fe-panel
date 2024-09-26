import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
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
import validatePhoneNumber from '@/utils/validatePhoneNumber';
import validateDOB from '@/utils/validateDOB';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useState } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMET } from '@/utils/contants';

dayjs.extend(customParseFormat);

const ModalAddUser = ({ isModalOpen, showModal, handleOk, handleCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log({ values });
    const date = formatDate(new Date(values?.dob));
    setIsLoading(true);
    try {
      const res = await createaUserApi({
        ...values,
        dob: date,
        roles: [
          'fec2c000-18ee-445b-b9ed-3ffbae406173',
          '123e4567-e89b-12d3-a456-426614174000',
        ],
      });
      if (res?.error) {
        toast.error(res?.message);
      } else {
        toast.success('Tạo thành công');
        handleOk();
        form.resetFields();
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.message);
    } finally {
      setIsLoading(false);
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
            rules={[
              { required: true, message: 'Vui lòng chọn ngày sinh' },
              { validator: validateDOB },
            ]}>
            <DatePicker defaultValue={dayjs('2007-09-03', DATE_FORMET)} />
          </Form.Item>
          <Divider />
          <Form.Item className='flex justify-end'>
            <div className='flex gap-4'>
              <Button onClick={handleCancel}>Đóng</Button>
              <Button
                loading={isLoading}
                disabled={isLoading}
                type='primary'
                htmlType='submit'>
                Tạo
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddUser;
