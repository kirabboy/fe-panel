import clsx from 'clsx';
import { useForm } from 'react-hook-form';

const CardFormComponent = (props) => {
  const { handleSubmit } = useForm();

  const { children, handleSubmitData, className } = props;
  return (
    <form
      className={clsx(
        'w-full flex flex-col justify-center gap-[1.8rem]',
        className
      )}
      onSubmit={handleSubmit((data) => handleSubmitData(data))}
    >
      {children}
    </form>
  );
};

export default CardFormComponent;
