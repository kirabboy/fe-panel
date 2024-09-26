import {
  DeleteFilled,
  EditFilled,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Popconfirm, Space, Tag } from 'antd';
import ModalAddUser from './components/ModalAddUser';
import { useEffect, useState } from 'react';
import { deleteUsersApi, getUsersApi } from '@/api/user';
import ModalEditUser from './components/ModalEditUser';

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [objEdit, setObjEdit] = useState({});
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
  });
  const [countData, setCountData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const showModalEdit = (obj) => {
    setIsModalOpenEdit(true);
    setObjEdit(obj);
  };
  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
    fetchData();
  };
  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

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
          <Button
            shape='circle'
            type='primary'
            icon={<EditFilled />}
            onClick={() => showModalEdit(obj)}
          />
          {!obj.isAdmin && (
            <Popconfirm
              title={`Xóa người: ${obj?.name}`}
              description={`Bạn có chắc chắn muốn xóa người dùng: ${obj?.name} này không?`}
              onConfirm={() => confirm(obj?.id)}
              okText='Có'
              cancelText='Không'>
              <Button
                shape='circle'
                danger
                icon={<DeleteFilled />}
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getUsersApi(params);
      setData(res.data.result);
      setCountData(res.data.total);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (page, pageSize) => {
    params.offset = page;
    params.limit = pageSize;
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [params]);

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

      <div className='p-6 flex flex-col gap-2'>
        <Input
          value={params.email}
          onChange={(e) =>
            setParams((pre) => ({ ...pre, email: e.target.value ?? '' }))
          }
          className='w-64'
          placeholder='Tìm theo email'
        />
        <MyTable
          isLoading={isLoading}
          columns={columns}
          data={data}
          params={params}
          countData={countData}
          handlePageChange={handlePageChange}
        />
      </div>
      <ModalEditUser
        obj={objEdit}
        handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        isModalOpen={isModalOpenEdit}
        setIsModalOpen={setIsModalOpenEdit}
      />
    </div>
  );
};

export default User;
