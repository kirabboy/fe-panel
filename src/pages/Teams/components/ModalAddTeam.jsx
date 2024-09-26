import { Button, Divider, Form, Input, Modal, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createTeam } from "../../../api/team";

const ModalAddTeam = ({ isModalOpen, showModal, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
      try {
        const res = await createTeam(values);
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
          size='large'
          type='primary'
          icon={<PlusCircleOutlined />}
          onClick={showModal}>
          Thêm team
        </Button>
        <Modal
          title={
            <>
              <h2 className='text-xl'>Thêm team</h2>
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
            onFinish={onFinish}
            autoComplete='off'>
            <Form.Item
              name='name'
              label='Tên team'
              rules={[{ required: true, message: 'Vui lòng nhập tên team' }]}>
              <Input
                placeholder='Nhập tên team'
                allowClear
              />
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
  
  export default ModalAddTeam;