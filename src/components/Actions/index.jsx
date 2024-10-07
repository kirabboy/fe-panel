import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import DeleteConfirmComponent from "../DeleteConfirm";

const ActionsComponent = ({
  containerClassName,
  onHandleView,
  onHandleUpdate,
  onHandleDelete,
  moreActions,
}) => {
  const actionItems = [
    {
      icon: <EyeOutlined />,
      onClick: onHandleView,
    },
    {
      icon: <EditOutlined />,
      onClick: onHandleUpdate,
      type: "primary",
    },
    {
      icon: (
        <DeleteConfirmComponent
          title="Bạn có muốn xóa thông tin này không?"
          onOke={() => onHandleDelete?.()}
        >
          <DeleteOutlined />
        </DeleteConfirmComponent>
      ),
      danger: true,
    },
  ];

  return (
    <Space size="middle" className={containerClassName}>
      {actionItems.map((item, index) => (
        <Button shape="circle" key={index} {...item} />
      ))}
      {moreActions}
    </Space>
  );
};

export default ActionsComponent;
