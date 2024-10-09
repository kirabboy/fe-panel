import { Button, Tag } from "antd";
import { useFetchVPS } from "../../api/swr/useFetchVPS";
import CardWrapper from "../../components/CardWrapper/CardWrapper";
import TableComponent from "../../components/Table";
import dayjs from "dayjs";
import constants from "../../utils/constants";
import BadgeString from "../../components/Badge/BadgeString";
import ActionsComponent from "../../components/Actions";
import TableHeader from "../../components/TableHeader";
import ModalComponent from "../../components/Modal";
import FormServer from "../../components/Form/FormCreateServer";
import { useState } from "react";
import { UseDeleteVPS } from "../../api/vps";
import toast from "react-hot-toast";
import BadgePassword from "../../components/Badge/BadgePassword";
import { formatNumberWithComma } from "../../utils/formatNumberWithComma";
import DividerComponent from "../../components/Divider";
import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import ServerInfoComponent from "../../components/ServerInfo";
import { Space } from "antd";
import RestartVPSComponent from "../../components/pages/VPS/RestartVPS";
import TurnOnAutoUpdateComponent from "../../components/pages/VPS/TurnOnAutoUpdate";
import UpdatePluginAndWordpressCoreComponent from "../../components/pages/VPS/UpdatePluginAndWordpressCore";
import ScanMalwareForWordpressComponent from "../../components/pages/VPS/ScanMalwareForWordpress";
import ModalResultComponent from "../../components/ModalResult";
const itemDropdowns = [
  {
    label: "Turn on Auto Update",
    key: constants.TURN_ON_AUTO_UPDATE,
  },
  {
    label: "Restart VPS",
    key: constants.RESTART_VPS,
  },
  {
    label: "Update Plugin And Wordpress Core",
    key: constants.UPDATE_PLUGIN_AND_WORDPRESS_CORE,
  },
  {
    label: "Scan Malware Wordpress",
    key: constants.SCAN_MALWARE_WORDPRESS,
  },
];

const Servers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const params = {
    isActive: undefined,
    ipAddress: undefined,
    keyword: undefined,
    offset: constants.limit * (currentPage - 1) + 1,
    page: currentPage,
    limit: constants.limit,
  };
  const {
    data,
    pagination: pagination,
    isLoading,
    mutate,
  } = useFetchVPS(params);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formType, setFormType] = useState();
  const [record, setRecord] = useState();
  const [openTime, setOpenTime] = useState();
  const [openServerInfo, setOpenServerInfo] = useState(false);

  const [status, setStatus] = useState({
    actionText: "",
    type: "",
  });

  const [openModalRestart, setOpenModalRestart] = useState(false);
  const [openModalTurnOn, setOpenModalTurnOn] = useState(false);
  const [openModalUpdatePluginWordpress, setOpenModalUpdatePluginWordpress] =
    useState(false);

  const [openModalScanMalware, setOpenModalScanMalware] = useState(false);
  const [openModalResult, setOpenModalResult] = useState(false);
  const onClick = ({ key }) => {
    if (key === constants.RESTART_VPS) {
      setOpenModalRestart(true);
      return;
    }

    if (key === constants.TURN_ON_AUTO_UPDATE) {
      setOpenModalTurnOn(true);
      return;
    }

    if (key === constants.UPDATE_PLUGIN_AND_WORDPRESS_CORE) {
      setOpenModalUpdatePluginWordpress(true);
      return;
    }

    if (key === constants.SCAN_MALWARE_WORDPRESS) {
      setOpenModalScanMalware(true);
      return;
    }
  };
  const columns = [
    {
      title: "Địa chỉ IP",
      dataIndex: "vpsIpAddress",
      key: "vpsIpAddress",
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
      title: "Trạng  thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
      render: (port) => <BadgeString text={port} />,
    },
    {
      title: "mysql_root_pwd",
      dataIndex: "mysql_root_pwd",
      key: "mysql_root_pwd",
      render: (mysql_root_pwd) => <BadgePassword password={mysql_root_pwd} />,
    },
    {
      title: "Tên domain",
      dataIndex: "domain_name",
      key: "domain_name",
      render: (domain_name) => <BadgeString text={domain_name} />,
    },
    {
      title: "Thời gian chờ",
      dataIndex: "readTimeOut",
      key: "readTimeOut",
      render: (readTimeOut) => (
        <BadgeString
          text={readTimeOut ? formatNumberWithComma(readTimeOut) : readTimeOut}
        />
      ),
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
          onHandleView={() => {
            setRecord(record);
            setOpenServerInfo(true);
          }}
          onHandleDelete={async () => {
            if (record?.id) {
              const serverRes = await UseDeleteVPS(record.id);
              if (serverRes.statusCode === 200) {
                toast.success("Xóa server thành công");
                mutate();
              } else {
                toast.error("Xóa server thất bại");
              }
            }
          }}
          onHandleUpdate={() => {
            setFormType(constants.UPDATE);
            setRecord(record);
            setOpenTime(new Date().toString());
            setOpenFormModal(true);
          }}
          moreActions={
            <Dropdown
              menu={{
                items: itemDropdowns,
                onClick,
              }}
              onClick={() => setRecord(record)}
            >
              <Space>
                <Button type="text" icon={<MoreOutlined />} />
              </Space>
            </Dropdown>
          }
        />
      ),
      align: "right",
      fixed: "right",
    },
  ];

  const handleCancelModalForm = () => {
    setOpenFormModal(false);
  };

  const handleCancelModalServerInfo = () => {
    setOpenServerInfo(false);
  };

  const title =
    formType === constants.CREATE ? "Tạo mới server" : "Cập nhật server";

  return (
    <CardWrapper>
      <TableHeader
        title="Quản lý servers"
        onClick={() => {
          setFormType(constants.CREATE);
          setOpenTime(new Date().toString());
          setOpenFormModal(true);
        }}
        buttonText={"Tạo mới server"}
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
      {/* Modal form vps */}
      {openFormModal && (
        <ModalComponent
          open={openFormModal}
          title={title}
          onCancel={handleCancelModalForm}
        >
          <DividerComponent className={"h-[0.2rem] my-[1.2rem]"} />
          <FormServer
            formType={formType}
            record={record}
            openTime={openTime}
            handleCancelModal={handleCancelModalForm}
          />
        </ModalComponent>
      )}
      {/* Modal get server info */}
      {openServerInfo && (
        <ModalComponent
          open={openServerInfo}
          title="Thông tin server"
          onCancel={handleCancelModalServerInfo}
        >
          <ServerInfoComponent vpsIpAddress={record?.vpsIpAddress} />
        </ModalComponent>
      )}

      {/* Modal restart vps */}
      {openModalRestart && (
        <RestartVPSComponent
          status={status}
          setStatus={setStatus}
          openModal={openModalRestart}
          setOpenModal={setOpenModalRestart}
          vpsIpAddress={record?.vpsIpAddress}
          openModalResult={openModalResult}
          setOpenModalResult={setOpenModalResult}
        />
      )}

      {/* Modal turn on auto update */}
      {openModalTurnOn && (
        <TurnOnAutoUpdateComponent
          status={status}
          setStatus={setStatus}
          openModal={openModalTurnOn}
          setOpenModal={setOpenModalTurnOn}
          vpsIpAddress={record?.vpsIpAddress}
          openModalResult={openModalResult}
          setOpenModalResult={setOpenModalResult}
        />
      )}

      {/* Modal update plugin and wordpress core */}
      {openModalUpdatePluginWordpress && (
        <UpdatePluginAndWordpressCoreComponent
          status={status}
          setStatus={setStatus}
          openModal={openModalUpdatePluginWordpress}
          setOpenModal={setOpenModalUpdatePluginWordpress}
          vpsIpAddress={record?.vpsIpAddress}
          openModalResult={openModalResult}
          setOpenModalResult={setOpenModalResult}
        />
      )}

      {/* Modal scan malware for wordpress */}
      {openModalScanMalware && (
        <ScanMalwareForWordpressComponent
          status={status}
          setStatus={setStatus}
          openModal={openModalScanMalware}
          setOpenModal={setOpenModalScanMalware}
          vpsIpAddress={record?.vpsIpAddress}
          openModalResult={openModalResult}
          setOpenModalResult={setOpenModalResult}
        />
      )}

      {/* Modal result when call api */}
      {openModalResult && (
        <ModalResultComponent
          open={openModalResult}
          setOpen={setOpenModalResult}
          type={status.type}
          actionText={status.actionText}
        />
      )}
    </CardWrapper>
  );
};

export default Servers;
