import constants from "../../../utils/constants";
import MoreActionModalComponent from "./MoreActionModal";
import { UseTurnOnAutoUpdate } from "../../../api/vps";
import { UseExecInfo } from "../../../api/execInfo";

const TurnOnAutoUpdateComponent = (props) => {
  const {
    vpsIpAddress,
    status,
    setStatus,
    openModal,
    setOpenModal,
    setOpenModalResult,
  } = props;

  const turnOnAutoUpdate = async () => {
    handleCancelModal();
    setOpenModalResult(true);
    setStatus((prev) => ({
      ...prev,
      type: constants.LOADING,
      actionText: "Đang trong quá trình xử lý, vui lòng chờ!",
    }));
    try {
      const res = await UseTurnOnAutoUpdate(vpsIpAddress);
      if (res && res?.statusCode === 200 && res?.data?.execInfo?.id) {
        const interval = setInterval(async () => {
          try {
            const response = await UseExecInfo(res?.data?.execInfo?.id);
            if (response?.statusCode === 200 && response?.data?.isSuccess) {
              setStatus({
                type: constants.SUCCESS,
                actionText: "Turn on auto update thành công!",
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
                actionText: `Turn on auto update thất bại: ${parseValue.level}!`,
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

  const handleCancelModal = () => {
    setOpenModal(false);
    setStatus({
      actionText: "",
      type: "",
    });
  };

  return (
    <div>
      {openModal && (
        <MoreActionModalComponent
          title="Turn on auto update"
          status={status}
          handleCancel={handleCancelModal}
          handleConfirm={turnOnAutoUpdate}
          contentInfo={"Vui lòng chọn xác nhận để thực hiện."}
          open={openModal}
        />
      )}
    </div>
  );
};

export default TurnOnAutoUpdateComponent;
