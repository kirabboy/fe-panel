import clsx from "clsx";
import { useForm } from "react-hook-form";
import InputComponent from "../Input";
import formValidation from "../../utils/formValidation";
import SelectComponent from "../Select";
import DatePickerComponent from "../DateTimePicker";
import DividerComponent from "../Divider";
import ButtonComponent from "../Button";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import constants from "../../utils/constants";
import { useFetchRoles } from "../../api/swr/useFetchRoles";
import { createUserApi, updateUserApiById } from "../../api/user";
import { toast } from "react-toastify";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import RadioComponent from "../Radio";

const FormUser = (props) => {
  const { formType, record, openTime, handleCancelModal, handleMutate } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageRoles, setCurrentPageRoles] = useState(1);
  const [optionRoles, setOptionRoles] = useState([]);
  const paramsRoles = {
    limit: constants.limit,
    offset: constants.limit * (currentPageRoles - 1),
    page: currentPageRoles,
  };

  const {
    data: dataRoles,
    pagination: paginationRoles,
    isLoading: isLoadingRoles,
    isValidating: isValidatingRoles,
  } = useFetchRoles(paramsRoles);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    const findCurrentRole =
      dataRoles?.filter((dataRole) => dataRole?.id === data.role) || null;
    const convertData = {
      ...data,
      dob: dayjs(data.dob).format("YYYY-MM-DD"),
      role:
        findCurrentRole && findCurrentRole?.length > 0
          ? findCurrentRole[0]?.name
          : undefined,
      roles: [data.role],
    };

    if (formType === constants.CREATE) {
      try {
        const resUser = await createUserApi(convertData);

        if (
          (resUser && resUser?.statusCode !== 400) ||
          (resUser && resUser?.statusCode !== 500)
        ) {
          setIsLoading(false);
          toast.success("Lưu thành công");
          handleCancelModal();
          reset();
          handleMutate();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoading(false);
          toast.error(`Lưu thất bại: ${error.data.message}`);
        } else {
          console.error("Unexpected error:", error);
          toast.error(`Lưu thất bại: ${error.statusText}`);
        }
        setIsLoading(false);
      }

      return;
    }

    if (formType === constants.UPDATE && record?.id) {
      try {
        const resUser = await updateUserApiById(record?.id, convertData);

        if (resUser && resUser?.statusCode === 200) {
          setIsLoading(false);
          toast.success("Lưu thành công");
          handleCancelModal();
          reset();
          handleMutate();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setIsLoading(false);
          toast.error(`Lưu thất bại: ${error.data.message}`);
        } else {
          console.error("Unexpected error:", error);
          toast.error(`Lưu thất bại: ${error.statusText}`);
        }
        setIsLoading(false);
      }

      return;
    }
  };

  useEffect(() => {
    if (formType === constants.UPDATE) {
      reset({
        userName: record?.userName,
        password: record?.password,
        name: record?.name,
        email: record?.email,
        mobileNumber: record?.mobileNumber,
        gender: record?.gender,
        dob: record?.dob,
        role:
          record?.userRoles && record?.userRoles?.length > 0
            ? record?.userRoles[0]?.role?.id
            : undefined,
      });

      return;
    }

    if (formType === constants.CREATE) {
      reset({
        userName: undefined,
        password: undefined,
        name: undefined,
        email: undefined,
        mobileNumber: undefined,
        gender: undefined,
        dob: undefined,
        roles: undefined,
      });
      return;
    }
  }, [openTime, record?.id, isLoadingRoles, isValidatingRoles]);
  useEffect(() => {
    if (
      record?.userRoles?.lenght > 0 &&
      (optionRoles?.length === 0 || isValidatingRoles) &&
      currentPageRoles === 1
    ) {
      if (record?.userRoles && record?.userRoles?.length > 0) {
        setOptionRoles({
          value: record?.userRoles[0]?.role?.id,
          label: record?.userRoles[0]?.role?.name,
        });
      }
    }
    if (dataRoles?.length > 0 && !isLoadingRoles && !isValidatingRoles) {
      const tempOptionUsers =
        dataRoles?.map((user) => ({
          value: user?.id,
          label: user?.name,
        })) || [];

      setOptionRoles((prev) =>
        [...(prev || []), ...tempOptionUsers].filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        )
      );
    }
  }, [record?.id, isLoadingRoles, isValidatingRoles]);

  const handlePopupScrollRoles = (e) => {
    if (e && e.currentTarget) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        !isLoadingRoles &&
        currentPageRoles <
          (Math.floor(paginationRoles?.total / constants.limit) + 1 || 1)
      ) {
        setCurrentPageRoles(currentPageRoles + 1);
      }
    }
  };

  return (
    <form
      className={clsx("w-full flex flex-col justify-center gap-[1.8rem]")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <InputComponent
          label="Tài khoản:"
          placeholder="Tài khoản"
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <InputComponent
          label="Tên:"
          placeholder="Tên"
          name="name"
          control={control}
          isRequired
          errors={errors.name}
          rules={formValidation.firstName}
        />
        <InputComponent
          label="Email:"
          placeholder="Email"
          name="email"
          control={control}
          isRequired
          errors={errors.email}
          rules={formValidation.email}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <InputComponent
          label="Số điện thoại:"
          placeholder="Số điện thoại"
          name="mobileNumber"
          control={control}
          isRequired
          errors={errors.mobileNumber}
          rules={formValidation.phone}
        />
        <DatePickerComponent
          control={control}
          label="Ngày sinh:"
          placeholder="Ngày sinh"
          name="dob"
          isRequired
          showTime={false}
          errors={errors.dob}
          rules={formValidation.birthday}
        />
      </div>

      <RadioComponent
        label="Giới tính:"
        placeholder="Giới tính"
        name="gender"
        control={control}
        isRequired
        options={[
          { value: "male", label: "Nam" },
          { value: "female", label: "Nữ" },
        ]}
        errors={errors.gender}
        rules={formValidation.gender}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        <SelectComponent
          name="role"
          control={control}
          label="Phân quyền:"
          placeholder="Phân quyền"
          options={optionRoles}
          isRequired
          errors={errors.role}
          rules={formValidation.roles}
          onPopupScroll={handlePopupScrollRoles}
        />
      </div>

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
                  />
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

export default FormUser;
