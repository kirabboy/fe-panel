import { Button, Input, Space, Table } from 'antd';

const Files = () => {
  const columns = [
    {
      title: 'File name',
      dataIndex: 'fileName',
      showSorterTooltip: {
        target: 'full-header',
      },

      // specify the condition of filtering result
      // here is that finding the name started with `value`

      sorter: (a, b) => a.fileName.length - b.fileName.length,
      sortDirections: ['descend'],
    },
    {
      title: 'PMSN/Owner',
      dataIndex: 'PMSN/Owner',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a['PMSN/Owner'] - b['PMSN/Owner'],
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: 'Modification time',
      dataIndex: 'modificationTime',
      sorter: (a, b) => a.modificationTime - b.modificationTime,
    },
    {
      title: 'Ps',
      dataIndex: 'ps',
      sorter: (a, b) => a.ps - b.ps,
    },
    {
      title: 'Opt',
      dataIndex: 'opt',
    },
  ];

  const data = [
    {
      key: '1',
      fileName: 'John Brown',
      'PMSN/Owner': 32,
      size: 'New York No. 1 Lake Park',
      modificationTime: '1',
      ps: '1',
      opt: '',
    },
    {
      key: '2',
      fileName: 'John Brown 2',
      'PMSN/Owner': 322,
      size: 'New York No. 1 Lake Park',
      modificationTime: '2',
      ps: '2',
      opt: '',
    },
    {
      key: '3',
      fileName: 'John Brown 3',
      'PMSN/Owner': 323,
      size: 'New York No. 1 Lake Park3',
      modificationTime: '3',
      ps: '',
      opt: '',
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className='w-full'>
      <div className='w-full gap-2 px-6 h-16 flex items-center justify-between bg-slate-200'>
        <Input
          className='w-72'
          placeholder='Search files'
          allowClear
        />
        <Space>
          <Button>Upload</Button>
          <Button>Remote download</Button>
          <Button>New</Button>
        </Space>
      </div>

      {/* table  */}

      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
      />
    </div>
  );
};

export default Files;
