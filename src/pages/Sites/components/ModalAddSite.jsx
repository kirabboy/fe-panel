import { Button, Divider, Form, Input, message, Modal } from 'antd';

import { createSiteApi } from '../../../api/websites';
import validateUrl from '../../../utils/validateUrl';

const ModalAddSite = ({ isModalOpen, handleOk, handleCancel }) => {
  const submit = async (values) => {
    try {
      const res = await createSiteApi(values);

      if (res.statusCode === 201) {
        message.success('Tạo thành công');
        handleOk();
      }
    } catch (e) {
      message.error(e?.message);
    }
  };

  return (
    <>
     
      <Modal
        title={
          <>
            <h2 className='text-xl'>Create a new site</h2>
            <p className='text-slate-500'>
              Vui lòng chọn máy chủ nơi bạn muốn phục vụ trang web mới của mình
            </p>
          </>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <Divider />

        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={submit}>
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true }]}>
            <Input placeholder='Nhập tên' />
          </Form.Item>

          <Form.Item
            label='Url'
            name='url'
            rules={[
              { required: true, message: 'Vui lòng nhập URL' },
              { validator: validateUrl },
            ]}>
            <Input placeholder='Nhập url' />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }]}>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>

          <Divider />

          <div className='flex justify-end gap-5 '>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              htmlType='submit'
              type='primary'>
              Tạo
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddSite;
