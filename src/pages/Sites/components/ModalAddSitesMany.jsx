import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { createSiteManyApi } from '@/api/websites';
import validateUrl from '@/utils/validateUrl';
import { toast } from 'react-toastify';

const ModalAddSitesMany = ({
  isModalOpen,
  showModal,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const res = await createSiteManyApi(values?.data);

      if (res.statusCode === 201) {
        toast.success('Tạo thành công');
        handleOk();
        form.resetFields();
      }
    } catch (e) {
      toast.error(e?.message);
    }
  };

  return (
    <>
      <Button
        size='large'
        icon={<PlusCircleOutlined />}
        onClick={showModal}>
        Thêm nhiều website
      </Button>
      <Modal
        className='!w-[1000px]'
        title={
          <>
            <h2 className='text-xl'>Thêm nhiều websites</h2>
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
          name='dynamic_form_nest_item'
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: 1000,
          }}
          autoComplete='off'>
          <Form.List name='data'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className='flex justify-between items-start'
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label={['Tên']}
                      className='w-[30%]'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tên',
                        },
                      ]}>
                      <Input placeholder='Nhập tên' />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      label={['Url']}
                      className='w-[30%]'
                      rules={[
                        { required: true, message: 'Vui lòng nhập URL' },
                        { validator: validateUrl },
                      ]}>
                      <Input placeholder='Nhập url' />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      className='w-[30%]'
                      label={['Mô tả']}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mô tả',
                        },
                      ]}>
                      <Input.TextArea placeholder='Nhập mô tả' />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Thêm website
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Divider />
          <Form.Item>
            <div className='flex justify-end gap-2'>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button
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

export default ModalAddSitesMany;
