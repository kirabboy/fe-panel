import clsx from 'clsx';

const TitleCardWrapper = ({ title, className }) => {
  return (
    <div className={clsx('w-full px-[1.5rem] h-[5rem]', className)}>
      <p className="text-[1.6rem] text-[#666] font-[500] leading-[5rem]">
        {title}
      </p>
    </div>
  );
};

export default TitleCardWrapper;
