import { Table } from 'antd';

const MyTable = ({
  isLoading,
  columns,
  data,
  params,
  countData,
  handlePageChange,
}) => {
  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data}
      pagination={{
        current: params?.offset,
        pageSize: params?.limit,
        total: countData,
        onChange: (page, pageSize) => {
          handlePageChange(page, pageSize);
        },
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      }}
    />
  );
};

export default MyTable;
