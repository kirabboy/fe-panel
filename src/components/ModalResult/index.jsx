import {
  CheckCircleFilled,
  CloseOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ModalComponent from "../Modal";
import ButtonComponent from "../Button";
import constants from "../../utils/constants";
import { Spin } from "antd";

const ModalResultComponent = (props) => {
  const { open, setOpen, type, actionText } = props;

  const handleCancelModal = () => {
    setOpen(false);
  };
  if (type === constants.LOADING)
    return (
      <ModalComponent open={open}>
        <div className="w-[35.2rem] h-[23.9rem] flex flex-col justify-center items-center">
          <Spin tip="Loading" size="large" />
        </div>
      </ModalComponent>
    );
  if (type === constants.SUCCESS)
    return (
      <ModalComponent open={open} onCancel={handleCancelModal}>
        <div className="relative flex flex-col justify-center items-center gap-[0.8rem]">
          <div className="mt-[1.2rem]">
            <CheckCircleFilled className="w-full h-full text-[6rem] text-[#fd9900]" />
          </div>
          <div
            className="absolute right-0 top-0 cursor-pointer"
            onClick={handleCancelModal}
          >
            <CloseOutlined className="text-[3rem]" />
          </div>
          <p className="text-[2.4rem] font-extrabold text-black text-center">
            Thành công
          </p>

          <p className="text-[1.6rem] font-[500] text-black text-center">
            {actionText}
          </p>

          <ButtonComponent
            text="Thoát"
            className="w-full py-[1.2rem] mt-[2.4rem] mb-[1.2rem]"
            textClassName="!text-[2rem] font-[500]"
            onClick={handleCancelModal}
          />
        </div>
      </ModalComponent>
    );

  if (type === constants.FAIL)
    return (
      <ModalComponent open={open} onCancel={handleCancelModal}>
        <div className="relative flex flex-col justify-center items-center gap-[0.8rem]">
          <div className="mt-[1.2rem]">
            <ExclamationCircleFilled className="w-full h-full text-[6rem] text-[#ff4d4f]" />
          </div>
          <div
            className="absolute right-0 top-0 cursor-pointer"
            onClick={handleCancelModal}
          >
            <CloseOutlined className="text-[3rem]" />
          </div>
          <p className="text-[2.4rem] font-extrabold text-black text-center">
            Thất bại
          </p>

          <p className="text-[1.6rem] font-[500] text-black text-center">
            {actionText}
          </p>

          <ButtonComponent
            text="Thoát"
            danger
            type="text"
            className="w-full py-[1.2rem] mt-[2.4rem] mb-[1.2rem]"
            textClassName="!text-[2rem] font-[500]"
            onClick={handleCancelModal}
          />
        </div>
      </ModalComponent>
    );
};

export default ModalResultComponent;
