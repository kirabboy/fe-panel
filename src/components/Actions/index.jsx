import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import ConfirmComponent from "../Confirm";

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
        <ConfirmComponent
          title="Bạn có muốn xóa thông tin này không?"
          onOke={() => onHandleDelete?.()}
        >
          <DeleteOutlined />
        </ConfirmComponent>
      ),
      danger: true,
      onClick: () => {},
    },
  ];

  return (
    <Space size="middle" className={containerClassName}>
      {actionItems.map((item, index) => {
        if (item?.onClick) {
          return <Button shape="circle" key={index} {...item} />;
        } else {
          return null;
        }
      })}
      {moreActions}
    </Space>
  );
};

export default ActionsComponent;
