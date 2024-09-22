import clsx from 'clsx';
import TitleCardWrapper from './TitleCardWrapper';
import DividerComponent from '../Divider';

const CardWrapper = ({ children, title, className }) => (
  <div
    className={clsx(
      'bg-white shadow-card-wrapper w-full relative z-10',
      className
    )}
  >
    {title && (
      <>
        <TitleCardWrapper title={title} />
        <DividerComponent />
      </>
    )}
    <div className="p-[2rem_1.5rem] text-[1.6rem]">{children}</div>
  </div>
);

export default CardWrapper;
