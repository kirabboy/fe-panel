import { Select } from 'antd';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

const SelectComponent = (props) => {
  const {
    name,
    rules,
    errors,
    helptext,
    options,
    control,
    containerClasName,
    className,
    labelClassName,
    label,
    isRequired,
    ...rest
  } = props;

  if (!control)
    return (
      <div
        className={clsx('w-auto flex flex-col gap-[0.6rem]', containerClasName)}
      >
        {!!label && (
          <label
            className={clsx(
              'font-[500] text-[1.4rem] leading-[2rem] text-[#484848]',
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <Select
          className={clsx(
            'w-full font-[500] text-[1.4rem] text-black leading-[2rem] border-[#000] hover:!border-[#000] focus:border-[#000] focus:shadow-none',
            className
          )}
          {...rest}
        >
          {options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
    );
  return (
    <div
      className={clsx('w-auto flex flex-col gap-[0.6rem]', containerClasName)}
    >
      {!!label && (
        <div className="flex items-center gap-[0.8rem]">
          <label
            className={clsx(
              'font-[500] text-[1.4rem] leading-[2rem] text-[#484848]',
              labelClassName
            )}
          >
            {label}
          </label>
          <div
            className={clsx(
              'flex items-center justify-center',
              isRequired ? 'visible' : 'invisible'
            )}
          >
            <span className="text-[red] font-bold text-[1.6rem]">*</span>
          </div>
        </div>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            className={clsx(
              'w-full font-[500] text-[1.4rem] leading-[2rem] border-[#000] hover:!border-[#000] focus:border-[#000] focus:shadow-none',
              className
            )}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            {...rest}
          >
            {options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />

      {helptext && (
        <p className="text-[1.4rem] text-[#667085] leading-[2rem] font-[500]">
          {helptext}
        </p>
      )}
      {errors && (
        <p className="text-[1.4rem] text-red-500 leading-[2rem] font-[500] text-right">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default SelectComponent;
