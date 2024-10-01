import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";

import ROLES from "@/utils/roles.js";
import formatDate from "@/utils/formatDate";
import validateEmail from "@/utils/validateEmail";
import { useEffect, useState } from "react";
import { updateUserApiById } from "@/api/user";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import validatePhoneNumber from "../../../../utils/validatePhoneNumber";
import constants from "../../../../utils/constants";

const ModalEditUser = ({ obj, isModalOpen, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [isLoding, setIsLoding] = useState(false);
  const onFinish = async (values) => {
    const date = formatDate(new Date(values?.dob));
    setIsLoding(true);
    try {
      const res = await updateUserApiById(obj.id, { ...values, dob: date });
      console.log({ res });
      if (res?.error) {
        toast.error(res?.message);
      } else {
        toast.success("Chỉnh sửa thành công");
        handleOk();
      }
    } catch (e) {
      console.log(e);
      toast.error(e?.message?.detail);
    } finally {
      setIsLoding(false);
    }
  };
  useEffect(() => {
    if (obj) {
      form.setFieldsValue({
        ...obj,
        dob: dayjs(obj.dob, constants.DATE_TIME_FORMAT),
      });
    }
  }, [obj]);
  return (
    <>
      <Modal
        title={
          <>
            <h2 className="text-xl">Chỉnh sửa Người Dùng</h2>
          </>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />

        <Form
          name="form-edit-user"
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
          autoComplete="off"
        >
          <Form.Item
            name="userName"
            label="UserName"
            rules={[{ required: true, message: "Vui lòng nhập user name" }]}
          >
            <Input placeholder="Nhập tên người dùng" allowClear />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập user ten" }]}
          >
            <Input placeholder="Nhập tên người dùng" allowClear />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { validator: validateEmail },
            ]}
          >
            <Input placeholder="Nhập email công việc" allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Phải ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" allowClear />
          </Form.Item>

          <Form.Item
            name="role"
            label="Phân quyền"
            rules={[{ required: true, message: "Vui chọn quyền" }]}
          >
            <Select placeholder="Chọn phân quyền" options={ROLES} />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input placeholder="+85577342526" allowClear />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Radio.Group name="gender">
              <Radio value={"male"}>Nam</Radio>
              <Radio value={"female"}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            // name='dob'
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker />
          </Form.Item>
          <Divider />
          <Form.Item className="justify-end flex ">
            <div className="flex gap-4">
              <Button onClick={handleCancel}>Đóng</Button>
              <Button
                loading={isLoding}
                disabled={isLoding}
                type="primary"
                htmlType="submit"
              >
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditUser;
