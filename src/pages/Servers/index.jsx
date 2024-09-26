import { Tag } from 'antd';
import { useFetchVPS } from '../../api/swr/useFetchVPS';
import CardWrapper from '../../components/CardWrapper/CardWrapper';
import TableComponent from '../../components/Table';
import dayjs from 'dayjs';
import constants from '../../utils/constants';
import BadgeString from '../../components/Badge/BadgeString';
import ActionsComponent from '../../components/Actions';
import TableHeader from '../../components/TableHeader';
import ModalComponent from '../../components/Modal';
import FormServer from '../../components/Form/FormCreateServer';
import { useState } from 'react';
import { UseDeleteVPS } from '../../api/vps';
import toast from 'react-hot-toast';
import BadgePassword from '../../components/Badge/BadgePassword';
import { formatNumberWithComma } from '../../utils/formatNumberWithComma';
import DividerComponent from '../../components/Divider';

const Servers = () => {
  const { data, isLoading, mutate } = useFetchVPS();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formType, setFormType] = useState();
  const [record, setRecord] = useState();
  const [openTime, setOpenTime] = useState();
  const columns = [
    {
      title: 'Địa chỉ IP',
      dataIndex: 'vpsIpAddress',
      key: 'vpsIpAddress',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
      render: (password) => <BadgePassword password={password} />,
    },
    {
      title: 'Trạng  thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Port',
      dataIndex: 'port',
      key: 'port',
      render: (port) => <BadgeString text={port} />,
    },
    {
      title: 'Thời gian chờ',
      dataIndex: 'readTimeOut',
      key: 'readTimeOut',
      render: (readTimeOut) => (
        <BadgeString
          text={readTimeOut ? formatNumberWithComma(readTimeOut) : readTimeOut}
        />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate) =>
        dayjs(createdDate).format(constants.DATE_TIME_FORMAT),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      render: (updatedDate) =>
        dayjs(updatedDate).format(constants.DATE_TIME_FORMAT),
    },
    {
      title: 'Ngày xóa',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      render: (deletedAt) =>
        deletedAt ? dayjs(deletedAt).format(constants.DATE_TIME_FORMAT) : '-',
    },
    {
      title: 'Thao tác',
      dataIndex: 'Actions',
      key: 'Actions',
      render: (_, record) => (
        <ActionsComponent
          // onHandleView={() =>
          //   navigate(`${paths.SERVER}/${constants.VIEW}/${record.id}`)
          // }
          onHandleDelete={async () => {
            if (record?.id) {
              const serverRes = await UseDeleteVPS(record.id);
              if (serverRes.statusCode === 200) {
                toast.success('Xóa server thành công');
                mutate();
              } else {
                toast.error('Xóa server thất bại');
              }
            }
          }}
          onHandleUpdate={() => {
            setFormType(constants.UPDATE);
            setRecord(record);
            setOpenTime(new Date().toString());
            setOpenFormModal(true);
          }}
        />
      ),
      align: 'right',
      fixed: 'right',
    },
  ];

  const handleCancelModal = () => {
    setOpenFormModal(false);
  };

  const title =
    formType === constants.CREATE ? 'Tạo mới server' : 'Cập nhật server';
  return (
    <CardWrapper>
      <TableHeader
        title="Quản lý servers"
        onClick={() => {
          setFormType(constants.CREATE);
          setOpenTime(new Date().toString());
          setOpenFormModal(true);
        }}
        buttonText={'Tạo mới server'}
      />
      <TableComponent
        columns={columns}
        dataSource={data}
        loading={isLoading}
        isLoading={true}
      />

      <ModalComponent
        open={openFormModal}
        title={title}
        onCancel={handleCancelModal}
      >
        <DividerComponent className={'h-[0.2rem] my-[1.2rem]'} />
        <FormServer
          formType={formType}
          record={record}
          openTime={openTime}
          handleCancelModal={handleCancelModal}
        />
      </ModalComponent>
    </CardWrapper>
  );
};

export default Servers;
