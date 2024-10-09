import constants from "../../../utils/constants";
import MoreActionModalComponent from "./MoreActionModal";
import { UseUpdatePluginAndWordpressCore } from "../../../api/vps";

const UpdatePluginAndWordpressCoreComponent = (props) => {
  const {
    vpsIpAddress,
    status,
    setStatus,
    openModal,
    setOpenModal,
    setOpenModalResult,
  } = props;

  const updatePluginAndWordpressCore = async () => {
    handleCancelModal();
    setOpenModalResult(true);
    setStatus((prev) => ({
      ...prev,
      type: constants.LOADING,
      actionText: "Update plugin and wordpress core",
    }));
    try {
      const res = await UseUpdatePluginAndWordpressCore(vpsIpAddress);
      if (res && res?.statusCode === 200) {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.SUCCESS,
            actionText: "Update plugin and wordpress core thành công!",
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            type: constants.FAIL,
            actionText: `Update plugin and wordpress core thất bại: ${res.data.messages}!`,
          }));
        }, 500);
      }
    } catch {
      setTimeout(() => {
        setStatus((prev) => ({
          ...prev,
          type: constants.FAIL,
          actionText: `Update plugin and wordpress core thất bại!`,
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
          title="Update plugin and wordpress core"
          status={status}
          handleCancel={handleCancelModal}
          handleConfirm={updatePluginAndWordpressCore}
          contentInfo={"Vui lòng chọn xác nhận để thực hiện."}
          open={openModal}
        />
      )}
    </div>
  );
};

export default UpdatePluginAndWordpressCoreComponent;
