import { Pagination, Table } from 'antd';

const TableComponent = (props) => {
  const { pagination, isLoading, pageSizeUI, setCurrentPage, ...rest } = props;

  const onChange = (page) => {
    setCurrentPage?.(page);
  };
  return (
    <div>
      <Table
        pagination={
          pageSizeUI
            ? {
                pageSize: pageSizeUI,
                showSizeChanger: false,
              }
            : false
        }
        scroll={{ x: 'max-content' }}
        {...rest}
      />
      {!isLoading && (
        <Pagination
          {...pagination}
          onChange={onChange}
          className="flex justify-end mt-[1.8rem]"
        />
      )}
    </div>
  );
};

export default TableComponent;
