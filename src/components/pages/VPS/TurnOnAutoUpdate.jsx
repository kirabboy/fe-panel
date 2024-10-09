import constants from "../../../utils/constants";
import MoreActionModalComponent from "./MoreActionModal";
import { UseTurnOnAutoUpdate } from "../../../api/vps";

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
      actionText: "Turn on auto update",
    }));
    try {
      const res = await UseTurnOnAutoUpdate(vpsIpAddress);
      if (res && res?.statusCode === 200) {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.SUCCESS,
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.FAIL,
          }));
        }, 500);
      }
    } catch {
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          type: constants.FAIL,
        }));
      }, 500);
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
