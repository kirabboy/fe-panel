import dayjs from "dayjs";
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import constants from "../../utils/constants";
import BadgePassword from "../../components/Badge/BadgePassword";
import BadgeString from "../../components/Badge/BadgeString";
import ActionsComponent from "../../components/Actions";
import TableComponent from "../../components/Table";
import TableHeader from "../../components/TableHeader";
import { useState } from "react";
import { useFetchUsers } from "../../api/swr/useFetchUsers";
import ModalComponent from "../../components/Modal";
import FormUser from "../../components/Form/FormUser";
import DividerComponent from "../../components/Divider";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteUsersApi } from "../../api/user";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formType, setFormType] = useState();
  const [openTime, setOpenTime] = useState();
  const [record, setRecord] = useState();
  const [openModalForm, setOpenModalForm] = useState(false);
  const params = {
    offset: constants.limit * (currentPage - 1),
    page: currentPage,
    limit: constants.limit,
  };

  const { data, pagination, isLoading, mutate } = useFetchUsers(params);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SĐT",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (mobileNumber) => <BadgeString text={mobileNumber} />,
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
      render: (password) => <BadgePassword password={password} />,
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "vpsIpAddress",
      key: "vpsIpAddress",
      render: (vpsIpAddress) => <BadgeString text={vpsIpAddress} />,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <BadgeString text={gender === "female" ? "Nữ" : "Nam"} />
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
      render: (dob) => <BadgeString text={dob} />,
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      key: "role",
      render: (role) => <BadgeString text={role} />,
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) =>
        dayjs(createdDate).format(constants.DATE_TIME_FORMAT),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedDate",
      key: "updatedDate",
      render: (updatedDate) =>
        dayjs(updatedDate).format(constants.DATE_TIME_FORMAT),
    },
    {
      title: "Ngày xóa",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (deletedAt) =>
        deletedAt ? dayjs(deletedAt).format(constants.DATE_TIME_FORMAT) : "-",
    },
    {
      title: "Thao tác",
      dataIndex: "Actions",
      key: "Actions",
      render: (_, record) => (
        <ActionsComponent
          //   onHandleView={() => {
          //     setRecord(record);
          //     setOpenServerInfo(true);
          //   }}
          onHandleDelete={async () => {
            if (record?.id) {
              try {
                const serverRes = await deleteUsersApi(record.id);
                if (serverRes.statusCode === 200) {
                  toast.success("Xóa user thành công");
                  mutate();
                } else {
                  toast.error("Xóa user thất bại");
                }
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  toast.error(`Xóa user thất bại: ${error.data.message}`);
                } else {
                  console.error("Unexpected error:", error);
                  toast.error(`Xóa user thất bại: ${error.statusText}`);
                }
              }
            }
          }}
          onHandleUpdate={() => {
            setFormType(constants.UPDATE);
            setRecord(record);
            setOpenTime(new Date().toString());
            setOpenModalForm(true);
          }}
        />
      ),
      align: "right",
      fixed: "right",
    },
  ];

  const handleCancelModalForm = () => {
    setOpenModalForm(false);
  };

  const handleMutate = () => {
    mutate();
  };
  const title =
    formType === constants.CREATE ? "Tạo mới user" : "Cập nhật user";
  return (
    <CardWrapper>
      <TableHeader
        title="Quản lý users"
        onClick={() => {
          setFormType(constants.CREATE);
          setOpenTime(new Date().toString());
          setOpenModalForm(true);
        }}
        buttonText={"Tạo mới user"}
      />
      <TableComponent
        columns={columns}
        dataSource={data}
        loading={isLoading}
        isLoading={isLoading}
        paginationItem={{
          current: currentPage,
          total: pagination?.total || 1,
          pageSize: constants.limit,
        }}
        setCurrentPage={setCurrentPage}
      />

      <ModalComponent
        className="!w-[55rem]"
        open={openModalForm}
        onCancel={handleCancelModalForm}
        title={title}
      >
        <DividerComponent className={"h-[0.2rem] my-[1.2rem]"} />
        <FormUser
          formType={formType}
          record={record}
          openTime={openTime}
          handleCancelModal={handleCancelModalForm}
          handleMutate={handleMutate}
        />
      </ModalComponent>
    </CardWrapper>
  );
};

export default Users;
