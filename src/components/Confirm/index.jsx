import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;
const ConfirmComponent = (props) => {
  const { content, onOke, children, title } = props;
  const showConfirm = () => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk: onOke,
      onCancel() {},
      okText: "Xác nhận",
      cancelText: "Hủy",
      centered: true,
      maskClosable: true,
    });
  };
  return (
    <div className="p-[1rem]" onClick={showConfirm}>
      {children}
    </div>
  );
};

export default ConfirmComponent;
