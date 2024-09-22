import ButtonComponent from '../../components/Button';
import CardWrapper from '../../components/CardWrapper/CardWrapper';

const Servers = () => {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <CardWrapper title="Server title">Server content</CardWrapper>

      <div className="flex gap-[1.2rem]">
        <ButtonComponent href="#" text="Preview" />
        <ButtonComponent type={'text'} text="Preview" />
        <ButtonComponent text="Buy now" />
      </div>
    </div>
  );
};

export default Servers;
