import formatDate from '@/utils/formatDate.js';
import { Table, Tabs, Button } from 'antd';
import data from './data.json';
import Search from 'antd/es/transfer/search';
import icons from '../../assets/icons';
import ModalAddSite from './components/ModalAddSite';
import { useState } from 'react';

const Sties = () => {
  const [open,setOpen] = useState(false)
  const columns = [
    {
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      key: 'url',
      title: 'Url',
      dataIndex: 'url',
    },
    {
      key: 'createdBy',
      title: 'Người tạo',
      dataIndex: 'createdBy',
      render: (obj) => <>{obj?.userName}</>,
    },
    {
      key: 'vpsIpAddress',
      title: 'Vps Ip Address',
      dataIndex: 'vpsIpAddress',
    },
    {
      key: 'createdDate',
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render: (value) => <>{formatDate(new Date(value))}</>,
    },
    {
      key: 'action',
      title: 'Thao tác',
      render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="text-[#ffb029] underline">
            <img src={icons.edit} alt="icon" />
          </button>
          <button className="text-[#ffb029] underline">
            <img src={icons.trash} alt="icon" />
          </button>
          <button className="text-[#ffb029] underline">
            <img src={icons.loader} alt="icon" />
          </button>
        </div>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: 'Node Project',
      children: (
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[0.4rem]">
              <Button type="primary" onClick={()=>setOpen(true)}>Thêm</Button>
              <Button className="border-[#ffb029]">Trang mặc định</Button>
              <Button className="border-[#ffb029]">Website mặc định</Button>
              <Button className="border-[#ffb029]">CLI version</Button>
            </div>
            <div className="w-[200px]">
              <Search enterButton />
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      ),
    },
    {
      key: '2',
      label: 'PHP Project',
      children: 'Content of Tab Pane 2',
    },
  ];

  const handleCloseModal = () =>{
    setOpen(false)
  }
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <section className="w-full">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          indicator={{
            size: (origin) => origin - 20,
            align: 'center',
          }}
          className="w-full"
        />
        
      </section>
      <ModalAddSite isModalOpen={open} handleCancel={handleCloseModal} handleOk={handleCloseModal}/>
    </>
  );
};

export default Sties;
