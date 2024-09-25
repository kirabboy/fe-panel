import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import DeleteConfirmComponent from '../DeleteConfirm';

const ActionsComponent = ({
  containerClassName,
  // onHandleView,
  onHandleUpdate,
  onHandleDelete,
}) => {
  const actionItems = [
    // {
    //   icon: <EyeOutlined />,
    //   onClick: onHandleView,
    // },
    {
      icon: <EditOutlined />,
      onClick: onHandleUpdate,
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
        <Button key={index} {...item} />
      ))}
    </Space>
  );
};

export default ActionsComponent;
