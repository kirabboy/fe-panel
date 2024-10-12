import { DatePicker } from "antd";
import clsx from "clsx";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const DatePickerComponent = (props) => {
  const {
    name,
    rules,
    errors,
    helpText,
    control,
    containerClassName,
    className,
    labelClassName,
    label,
    isRequired,
    ...rest
  } = props;

  return (
    <div
      className={clsx("w-auto flex flex-col gap-[0.6rem]", containerClassName)}
    >
      {!!label && (
        <div className="flex items-center gap-[0.8rem]">
          <label
            className={clsx(
              "font-[500] text-[1.4rem] leading-[2rem] text-[#484848]",
              labelClassName
            )}
          >
            {label}
          </label>
          <div
            className={clsx(
              "flex items-center justify-center",
              isRequired ? "visible" : "invisible"
            )}
          >
            <span className="text-[red] font-bold text-[1.6rem]">*</span>
          </div>
        </div>
      )}
      {!control ? (
        <DatePicker
          {...rest}
          className={clsx("text-[1.6rem] font-[500]", className)}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker
              className={clsx("text-[1.6rem] font-[500]", className)}
              onChange={(date) => {
                onChange(date ? dayjs(date).toISOString() : undefined);
              }}
              onBlur={onBlur}
              value={value ? dayjs(value) : null}
              ref={ref}
              showTime
              {...rest}
            />
          )}
        />
      )}
      {helpText && (
        <p className="text-[1.4rem] text-[#667085] leading-[2rem] font-[500]">
          {helpText}
        </p>
      )}
      {errors && (
        <p className="text-[1.4rem] text-red-500 leading-[2rem] font-[500]">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default DatePickerComponent;
