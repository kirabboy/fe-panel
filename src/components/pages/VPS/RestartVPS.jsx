import { UseRestartVPS } from "../../../api/vps";
import constants from "../../../utils/constants";
import MoreActionModalComponent from "./MoreActionModal";

const RestartVPSComponent = (props) => {
  const {
    vpsIpAddress,
    status,
    setStatus,
    openModal,
    setOpenModal,
    setOpenModalResult,
  } = props;
  const handleCancelModal = () => {
    setOpenModal(false);
    setStatus({
      actionText: "",
      type: "",
    });
  };
  const restartVPS = async () => {
    handleCancelModal();
    setOpenModalResult(true);
    setStatus((prev) => ({
      ...prev,
      type: constants.LOADING,
      actionText: "Restart VPS",
    }));
    try {
      const res = await UseRestartVPS(vpsIpAddress);
      if (res && res?.statusCode === 200) {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.SUCCESS,
            actionText: "Restart VPS thành công!",
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.FAIL,
            actionText: `Restart VPS thất bại: ${res.data.message}!`,
          }));
        }, 500);
      }
    } catch {
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          type: constants.FAIL,
          actionText: `Restart VPS thất bại!`,
        }));
      }, 500);
    }
  };

  return (
    <div>
      {openModal && (
        <MoreActionModalComponent
          title="Restart VPS"
          status={status}
          handleCancel={handleCancelModal}
          handleConfirm={restartVPS}
          contentInfo={"Vui lòng chọn xác nhận để thực hiện."}
          open={openModal}
        />
      )}
    </div>
  );
};

export default RestartVPSComponent;
