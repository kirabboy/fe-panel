import ButtonComponent from '../Button';

const TableHeader = (props) => {
  const { title, onClick, buttonText } = props;
  return (
    <div className="flex justify-between items-center mb-[1.2rem]">
      {title && <p className="text-[1.6rem] uppercase">{title}</p>}
      <ButtonComponent onClick={onClick} text={buttonText} />
    </div>
  );
};

export default TableHeader;
