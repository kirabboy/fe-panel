import ButtonComponent from "../Button";
import SearchComponent from "../Search";

const TableHeader = (props) => {
  const { title, onClick, buttonText } = props;
  return (
    <div className="flex justify-between items-end mb-[1.8rem]">
      <div className="flex flex-col justify-start items-start gap-[1.2rem]">
        {title && <p className="text-[1.6rem] uppercase">{title}</p>}
        <SearchComponent />
      </div>
      <ButtonComponent onClick={onClick} text={buttonText} />
    </div>
  );
};

export default TableHeader;
