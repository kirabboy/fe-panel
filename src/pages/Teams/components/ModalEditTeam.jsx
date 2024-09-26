import { Button, Divider, Form, Input, Modal, message } from "antd";
import { updateTeamById } from "../../../api/team";
import { useEffect } from "react";

const ModalEditTeam = ({ obj, isModalOpen, handleOk, handleCancel }) => {
    console.log("objobj",obj);
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const res = await updateTeamById(obj.id, values);
            if (res?.error) {
                message.error(res?.message);
            } else {
                message.success('Chỉnh sửa thành công');
                handleOk();
            }
        } catch (e) {
            console.log(e);
            message.error(e?.message?.detail);
        }
    };

    useEffect(() => {
        if (obj) {
          form.setFieldsValue({ ...obj });
        }
      }, [obj]);

    return (
        <Modal
            title={
                <>
                    <h2 className='text-xl'>Chỉnh sửa team</h2>
                </>
            }
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}>
            <Divider />

            <Form
                name='form-edit-user'
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
    );
}

export default ModalEditTeam;