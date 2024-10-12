import { useForm } from "react-hook-form";
import InputComponent from "../../components/Input";
import ButtonComponent from "../../components/Button";
import clsx from "clsx";
import constants from "../../utils/constants";
import { UseCreateVPS, UseUpdateVPS } from "../../api/vps";
import { useEffect } from "react";
import SelectComponent from "../Select";
import formValidation from "../../utils/formValidation";
import toast from "react-hot-toast";
import DividerComponent from "../Divider";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getUserProfile } from "../../utils/getUser";
import { useNavigate } from "react-router-dom";
import paths from "../../utils/paths";
import { useFetchUsers } from "../../api/swr/useFetchUsers";

const FormServer = (props) => {
  const navigate = useNavigate();
  const { formType, record, openTime, handleCancelModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [optionUsers, setOptionUsers] = useState([]);
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const paramsUser = {
    limit: constants.limit,
    offset: constants.limit * (currentPageUser - 1),
    page: currentPageUser,
  };

  const {
    data: dataUsers,
    pagination: paginationUsers,
    isLoading: isLoadingUsers,
    isValidating: isValidatingUsers,
  } = useFetchUsers(paramsUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (formType === constants.UPDATE) {
      reset({
        ...record,
        users: record?.users?.map((user) => user.id),
      });

      return;
    }

    if (formType === constants.CREATE) {
      reset({
        userName: undefined,
        password: undefined,
        vpsIpAddress: undefined,
        port: undefined,
        readTimeOut: undefined,
        users: undefined,
      });
      return;
    }
  }, [openTime, record?.id]);

  useEffect(() => {
    if (
      record?.users?.lenght > 0 &&
      (optionUsers?.length === 0 || isLoadingUsers) &&
      currentPageUser === 1
    ) {
      setOptionUsers(
        record?.users?.map((user) => ({
          value: user?.id,
          label: user?.userName,
        }))
      );
    }
    if (dataUsers?.length > 0 && !isLoadingUsers && !isValidatingUsers) {
      const tempOptionUsers =
        dataUsers?.map((user) => ({
          value: user?.id,
          label: user?.userName,
        })) || [];

      setOptionUsers((prev) =>
        [...(prev || []), ...tempOptionUsers].filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        )
      );
    }
  }, [record?.id, isValidatingUsers, isValidatingUsers]);

  const onSubmit = async (data) => {
    const user = getUserProfile();

    if (!user?.id) {
      toast.error("Vui lòng đăng nhập!");
      navigate(paths.LOGIN);
      return;
    }

    setIsLoading(true);
    if (formType === constants.CREATE) {
      const convertData = {
        userName: data.userName,
        password: data.password,
        vpsIpAddress: data.vpsIpAddress,
        port: Number(data.port),
        readTimeOut: Number(data.readTimeOut),
        createdById: user.id,
        email: user.email,
        users: data.users || undefined,
      };
      const serverRes = await UseCreateVPS(convertData);
      if (serverRes.statusCode === 200) {
        setIsLoading(false);

        toast.success("Lưu thành công");
        handleCancelModal();
        reset();
      } else {
        setIsLoading(false);
        toast.error(`Lưu thất bại: ${serverRes.data.message}`);
      }
      return;
    }
    if (formType === constants.UPDATE && record?.id) {
      const convertData = {
        userName: data.userName,
        password: data.password,
        vpsIpAddress: data.vpsIpAddress,
        port: Number(data.port),
        readTimeOut: Number(data.readTimeOut),
        createdById: user.id,
        email: user.email,
        users: data.users || undefined,
      };

      const serverRes = await UseUpdateVPS(record.id, convertData);

      if (serverRes.statusCode === 200) {
        setIsLoading(false);
        toast.success("Lưu thành công");
        handleCancelModal();
        reset();
      } else {
        setIsLoading(false);
        toast.error(`Lưu thất bại: ${serverRes.data.message}`);
      }
      return;
    }
  };

  const handlePopupScrollUsers = (e) => {
    if (e && e.currentTarget) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        !isLoadingUsers &&
        currentPageUser <
          (Math.floor(paginationUsers?.total / constants.limit) + 1 || 1)
      ) {
        setCurrentPageUser(currentPageUser + 1);
      }
    }
  };
  return (
    <form
      className={clsx("w-full flex flex-col justify-center gap-[1.8rem]")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputComponent
        label="Tài khoản:"
        placeholder="Tài khỏan"
        name="userName"
        control={control}
        isRequired
        errors={errors.userName}
        rules={formValidation.userName}
      />
      <InputComponent
        label="Mật khẩu:"
        placeholder="Mật khẩu"
        name="password"
        control={control}
        isPassword
        autoComplete="new-password"
        isRequired
        errors={errors.password}
        rules={formValidation.password}
      />

      <InputComponent
        label="Địa chỉ IP:"
        placeholder="Địa chỉ IP"
        name="vpsIpAddress"
        control={control}
        isRequired
        errors={errors.vpsIpAddress}
        rules={formValidation.vpsIpAddress}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <InputComponent
          label="Port:"
          placeholder="Port"
          name="port"
          control={control}
          isRequired
          errors={errors.port}
          rules={formValidation.port}
          type="number"
        />
        <InputComponent
          label="Thời gian chờ:"
          placeholder="Thời gian chờ"
          name="readTimeOut"
          control={control}
          isRequired
          errors={errors.readTimeOut}
          rules={formValidation.readTimeOut}
          type="number"
        />
      </div>

      <SelectComponent
        name="users"
        control={control}
        label="Users:"
        placeholder="User"
        options={optionUsers}
        mode="multiple"
        onPopupScroll={handlePopupScrollUsers}
      />
      <div className="flex flex-col justify-start items-end gap-[1.2rem]">
        <DividerComponent className={"h-[0.2rem]"} />
        <div className="flex justify-end items-center gap-[1.2rem]">
          <ButtonComponent text="Hủy" type="text" onClick={handleCancelModal} />
          <ButtonComponent
            type="primary"
            htmlType="submit"
            text={
              isLoading ? (
                <>
                  <Spin
                    indicator={
                      <LoadingOutlined
                        className="text-white mr-[1.2rem]"
                        spin
                      />
                    }
                  />{" "}
                  Lưu
                </>
              ) : (
                "Lưu"
              )
            }
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default FormServer;
