import { Radio } from "antd";
import clsx from "clsx";
import { Controller } from "react-hook-form";

const RadioComponent = (props) => {
  const {
    control,
    name,
    label,
    className,
    options,
    labelClassName,
    containerClassName,
    rules,
    errors,
    helptext,
    ...rest
  } = props;
  return (
    <div>
      <div
        className={clsx(
          "w-full flex justify-start items-center gap-[1.2rem] ",
          containerClassName
        )}
      >
        {!!label && (
          <label
            className={clsx(
              "font-[500] text-[14px] leading-[20px] text-[#484848]",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Radio.Group
                className={clsx(
                  "font-[400] text-[14px] md:text-[16px] text-red",
                  className
                )}
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
              />
            )}
          />
        </div>
      </div>
      {helptext && (
        <p className="text-[14px] text-[#667085] leading-[20px] font-[500]">
          {helptext}
        </p>
      )}
      {errors && (
        <p className="text-[14px] text-[#F04438] leading-[20px] font-[500]">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default RadioComponent;
