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

const FormServer = (props) => {
  const { formType, record, openTime, handleCancelModal } = props;
  const [isLoading, setIsLoading] = useState(false);
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
      reset(record);
      return;
    }

    if (formType === constants.CREATE) {
      reset({
        userName: undefined,
        password: undefined,
        vpsIpAddress: undefined,
        port: undefined,
        readTimeOut: undefined,
      });
      return;
    }
  }, [openTime, record?.id]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (formType === constants.CREATE) {
      const serverRes = await UseCreateVPS(data);
      if (serverRes.statusCode === 200) {
        setIsLoading(false);

        toast.success("Lưu thành công");
        handleCancelModal();
        reset();
      } else {
        setIsLoading(false);
        toast.error(`Lưu thất bại: ${serverRes.message}`);
      }
      return;
    }
    if (formType === constants.UPDATE && record?.id) {
      const convertData = {
        userName: data.userName,
        password: data.password,
        vpsIpAddress: data.vpsIpAddress,
        port: data.port,
        readTimeOut: data.readTimeOut,
        isActive: data.isActive,
      };
      const serverRes = await UseUpdateVPS(record.id, convertData);

      if (serverRes.statusCode === 200) {
        setIsLoading(false);
        toast.success("Lưu thành công");
        handleCancelModal();
        reset();
      } else {
        setIsLoading(false);
        toast.error(`Lưu thất bại: ${serverRes.message}`);
      }
      return;
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
      <InputComponent
        label="Port:"
        placeholder="Port"
        name="port"
        control={control}
        isRequired
        errors={errors.port}
        rules={formValidation.port}
      />
      <InputComponent
        label="Thời gian chờ:"
        placeholder="Thời gian chờ"
        name="readTimeOut"
        control={control}
        isRequired
        errors={errors.readTimeOut}
        rules={formValidation.readTimeOut}
      />
      {formType === constants.UPDATE && (
        <SelectComponent
          control={control}
          name="isActive"
          label="Trạng thái:"
          placeholder="Trạng thái"
          options={[
            {
              value: true,
              label: "Hoạt động",
            },
            {
              value: false,
              label: "Không hoạt động",
            },
          ]}
        />
      )}
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
