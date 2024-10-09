import { Modal } from "antd";
import clsx from "clsx";

const ModalComponent = (props) => {
  const { className, ...rest } = props;
  return (
    <Modal
      className={clsx("modal-custom w-full", className)}
      footer={null}
      closeIcon={null}
      classNames={{
        content: "rounded-[1.8rem]  p-[2.4rem]",
        header: "mb-[16px] *:text-[1.8rem]",
      }}
      centered
      maskClosable
      {...rest}
    />
  );
};

export default ModalComponent;
