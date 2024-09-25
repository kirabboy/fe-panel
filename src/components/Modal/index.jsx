import { Modal } from 'antd';

const ModalComponent = (props) => {
  const { ...rest } = props;
  return (
    <Modal
      className="modal-custom"
      {...rest}
      footer={null}
      closeIcon={null}
      classNames={{
        content: 'rounded-[1.8rem]  p-[2.4rem]',
        header: 'mb-[16px] *:text-[1.8rem]',
      }}
      centered
      maskClosable
    />
  );
};

export default ModalComponent;
