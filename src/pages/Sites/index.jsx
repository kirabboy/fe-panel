import { SnippetsOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate.js';
import ModalAddSite from './components/ModalAddSite';
import { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { getSiteApi } from '../../api/websites';

const Sties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [params, setParams] = useState({
  //   limit: '10',
  //   name: '',
  //   url: '',
  //   user: '',
  // });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    fetchData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const res = await getSiteApi();

      setData(res?.data?.items);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      title: 'VpsIpAddress',
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
    },
  ];

  return (
    <section className='w-full'>
      <div className='px-6 h-16 flex items-center justify-between bg-slate-200'>
        <div>
          <h2 className='uppercase font-semibold text-xl'>
            <SnippetsOutlined className='text-primary' /> Sites Center
          </h2>
        </div>
        <div className='flex items-center gap-4'>
          <ModalAddSite
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Input placeholder='Search' />
        </div>
      </div>

      <div className='p-6'>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </section>
  );
};

export default Sties;
