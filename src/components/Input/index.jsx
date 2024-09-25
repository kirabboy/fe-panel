import { Input } from 'antd';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

const InputComponent = (props) => {
  const {
    isPassword,
    label,
    labelClassName,
    className,
    control,
    name,
    rules,
    errors,
    helptext,
    isRequired = false,
    ...rest
  } = props;

  return (
    <div className="flex flex-col gap-[0.6rem]">
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

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) =>
            isPassword ? (
              <Input.Password
                className={clsx(
                  'h-[4.2rem] font-[500] text-[1.4rem] leading-[2rem]',
                  className
                )}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
              />
            ) : (
              <Input
                className={clsx(
                  'h-[4.2rem] font-[500] text-[1.4rem] leading-[2rem] text-black',
                  className
                )}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                {...rest}
              />
            )
          }
        />
      ) : (
        <Input
          className={clsx(
            'h-[4.2rem] font-[500] text-[1.4rem] leading-[2rem]',
            className
          )}
          {...rest}
        />
      )}

      {helptext && (
        <p className="text-[1.4rem] text-[#667085] leading-[2rem] font-[500]">
          {helptext}
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

export default InputComponent;
