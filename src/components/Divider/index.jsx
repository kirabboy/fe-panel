import { Divider } from 'antd';
import clsx from 'clsx';

const DividerComponent = ({ className }) => {
  return (
    <Divider className={clsx('w-full my-0 h-[0.05rem] bg-[#eee]', className)} />
  );
};

export default DividerComponent;
