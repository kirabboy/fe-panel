import { Button, Divider, Form, Input, Modal } from 'antd';
import validateUrl from '@/utils/validateUrl';
import { useEffect } from 'react';
import { updateSiteApi } from '@/api/websites';
import { toast } from 'react-toastify';

const ModalEditSite = ({ obj, isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (obj) form.setFieldsValue(obj);
  }, [obj]);

  const submit = async (values) => {
    try {
      const res = await updateSiteApi(obj.id, values);
      if (res.statusCode === 200) {
        toast.success('Chỉnh sửa thành công');
        handleOk();
      }
    } catch (e) {
      toast.error(e?.message);
    }
  };

  return (
    <Modal
      title={
        <>
          <h2 className='text-xl'>Chỉnh sửa website</h2>
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
        form={form}
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
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEditSite;
