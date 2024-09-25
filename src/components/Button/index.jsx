import { Button } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const ButtonComponent = (props) => {
  const { text, textClassName, textColorClassName, href, ...rest } = props;

  if (href) {
    return (
      <Link
        to={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'h-auto p-[0.5rem_1rem] rounded-[0.3rem] border-[0.1rem] border-solid border-[#ccc] text-[1.2rem]',
          textClassName,
          textColorClassName ||
            'bg-[#10952a] hover:bg-[#398439] hover:border-[#398439] text-white',
          rest.className
        )}
      >
        {text}
      </Link>
    );
  }
  return (
    <Button
      type={rest.type ?? 'primary'}
      {...rest}
      className={clsx('w-fit h-auto rounded-[0.3rem]', rest.className)}
    >
      <p
        className={clsx(
          'h-auto',
          textClassName,
          textColorClassName || 'text-inherit'
        )}
      >
        {text}
      </p>
    </Button>
  );
};

export default ButtonComponent;
