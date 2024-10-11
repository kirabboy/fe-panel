import { UseRestartVPS } from "../../../api/vps";
import constants from "../../../utils/constants";
import MoreActionModalComponent from "./MoreActionModal";
import { UseExecInfo } from "../../../api/execInfo";

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
      if (res && res?.statusCode === 200 && res?.data?.execInfo?.id) {
        const interval = setInterval(async () => {
          try {
            const response = await UseExecInfo(res?.data?.execInfo?.id);
            if (response?.statusCode === 200 && response?.data?.isSuccess) {
              setStatus({
                type: constants.SUCCESS,
                actionText: "Restart VPS thành công!",
              });
              clearInterval(interval);
            }

            if (response?.statusCode === 200 && response?.data?.isError) {
              let parseValue = "";
              if (response?.data?.value) {
                parseValue = JSON.parse(response?.data?.value);
              }
              setStatus({
                type: constants.FAIL,
                actionText: `Restart VPS thất bại: ${parseValue.level}!`,
              });
              clearInterval(interval);
            }

            if (
              response?.statusCode === 200 &&
              !response?.data?.isError &&
              !response?.data?.isSuccess
            ) {
              setStatus({
                type: constants.LOADING,
                actionText: "Đang trong quá trình xử lý, vui lòng chờ!",
              });
            }
          } catch (err) {
            console.log("err", err);
            setStatus({
              type: constants.FAIL,
              actionText: `Lỗi server: ${err.message}`,
            });
            clearInterval(interval);
          }
        }, 5000);
      }
    } catch (err) {
      console.log("err", err);
      setStatus({
        type: constants.FAIL,
        actionText: `Lỗi server: ${err.message}`,
      });
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
