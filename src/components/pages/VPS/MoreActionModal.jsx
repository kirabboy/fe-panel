import ModalComponent from "../../Modal";
import ButtonComponent from "../../Button";

const MoreActionModalComponent = (props) => {
  const { open, handleCancel, handleConfirm, contentInfo, title } = props;
  return (
    <ModalComponent open={open} title={title} onCancel={handleCancel}>
      <div className="relative min-[5rem] z-20">
        <p className="text-[1.6rem] font-[500] mt-[1.2rem]">{contentInfo}</p>
        <div className="flex justify-end items-center gap-[1.2rem] mt-[1.2rem]">
          <ButtonComponent type="text" text="Hủy" onClick={handleCancel} />
          <ButtonComponent text="Xác nhận" onClick={handleConfirm} />
        </div>
      </div>
    </ModalComponent>
  );
};

export default MoreActionModalComponent;
