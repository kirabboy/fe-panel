import { Input } from "antd";

const { Search } = Input;
const SearchComponent = (props) => {
  const { setSearchValue } = props;
  const onSearch = (value) => setSearchValue(value);
  return (
    <Search
      placeholder="Nhập nội dung tìm kiếm"
      allowClear
      onSearch={onSearch}
      style={{ width: 200 }}
    />
  );
};

export default SearchComponent;
