import {
  DeleteFilled,
  // EditFilled,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import ModalAddUser from './components/ModalAddUser';
import { useEffect, useState } from 'react';
import { deleteUsersApi, getUsersApi } from '../../../api/user';
// import ModalEditUser from './components/ModalEditUser';

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  // const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  // const [objEdit, setObjEdit] = useState({});

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

  // const showModalEdit = (obj) => {
  //   setIsModalOpenEdit(true);
  //   setObjEdit(obj);
  // };
  // const handleOkEdit = () => {
  //   setIsModalOpenEdit(false);
  //   fetchData();
  // };
  // const handleCancelEdit = () => {
  //   setIsModalOpenEdit(false);
  // };

  const confirm = async (values) => {
    try {
      const res = await deleteUsersApi(values);
      if (res?.statusCode === 200) {
        message.success('Xoá người dùng thành công');
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phân quyền',
      dataIndex: 'role',
      render: (text) => (
        <Tag
          className='uppercase'
          color={text === 'admin' && 'orange'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (obj) => (
        <Space size='middle'>
          {/* <Button
            type='primary'
            icon={<EditFilled />}
            onClick={() => showModalEdit(obj)}
          /> */}

          <Popconfirm
            title={`Xóa người: ${obj?.name}`}
            description={`Bạn có chắc chắn muốn xóa người dùng: ${obj?.name} này không?`}
            onConfirm={() => confirm(obj?.id)}
            okText='Có'
            cancelText='Không'>
            <Button
              danger
              icon={<DeleteFilled />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res = await getUsersApi({});

      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='w-full'>
      <div className='w-full gap-2 px-6  h-16 flex items-center justify-between bg-slate-200'>
        <h2 className='uppercase font-semibold text-xl'>
          <UserSwitchOutlined className='text-primary' /> User
        </h2>
        <ModalAddUser
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      {/* table  */}

      <div className='p-6'>
        <Table
          columns={columns}
          dataSource={data}
          showSorterTooltip={{
            target: 'sorter-icon',
          }}
        />
      </div>
      {/* <ModalEditUser
        obj={objEdit}
        handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        isModalOpen={isModalOpenEdit}
        setIsModalOpen={setIsModalOpenEdit}
      /> */}
    </div>
  );
};

export default User;
