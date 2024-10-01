import { DeleteFilled, EditFilled, SnippetsOutlined } from "@ant-design/icons";
import formatDate from "@/utils/formatDate.js";
import ModalAddSite from "./components/ModalAddSite";
import { useContext, useEffect, useState } from "react";
import { Button, Input, message, Popconfirm, Space } from "antd";
import { deleteSiteApi, getSiteApi } from "@/api/websites";
import ModalEditSite from "./components/ModalEditSite";
import ModalAddSitesMany from "./components/ModalAddSitesMany";
import { UserContext } from "../../hooks/ContextUser";
import TableComponent from "../../components/Table";

const Sties = () => {
  const { user } = useContext(UserContext);
  console.log({ user });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalAddManyOpen, setIsModalAddManyOpen] = useState(false);
  const [objEdit, setObjEdit] = useState({});
  const [params, setParams] = useState({
    limit: 10,
    offset: 1,
  });
  const [countData, setCountData] = useState(0);

  useEffect(() => {
    fetchData();
  }, [params]);

  const handlePageChange = async (page, pageSize) => {
    params.offset = page;
    params.limit = pageSize;
    fetchData();
  };

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

  const showModalAddMany = () => {
    setIsModalAddManyOpen(true);
  };

  const handleOkAddMany = () => {
    setIsModalAddManyOpen(false);
    fetchData();
  };

  const handleCancelAddMany = () => {
    setIsModalAddManyOpen(false);
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getSiteApi(params);

      setData(res?.data?.result);
      setCountData(res?.data?.total);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const confirm = async (id) => {
    try {
      const res = await deleteSiteApi(id);
      if (res?.statusCode === 200) {
        message.success("Xoá website thành công");
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      key: "name",
      title: "Tên",
      dataIndex: "name",
    },

    {
      key: "url",
      title: "Url",
      dataIndex: "url",
    },
    {
      key: "createdBy",
      title: "Người tạo",
      dataIndex: "createdBy",
      render: (obj) => <>{obj?.userName}</>,
    },
    {
      key: "vpsIpAddress",
      title: "VpsIpAddress",
      dataIndex: "vpsIpAddress",
    },
    {
      key: "createdDate",
      title: "Ngày tạo",
      dataIndex: "createdDate",
      render: (value) => <>{formatDate(new Date(value))}</>,
    },
    {
      key: "action",
      title: "Thao tác",
      render: (obj) => (
        <Space size="middle">
          <Button
            shape="circle"
            type="primary"
            icon={<EditFilled />}
            onClick={() => showModalEdit(obj)}
          />

          <Popconfirm
            title={`Xóa người: ${obj?.name}`}
            description={`Bạn có chắc chắn muốn xóa người dùng: ${obj?.name} này không?`}
            onConfirm={() => confirm(obj?.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger shape="circle" icon={<DeleteFilled />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <section className="w-full">
      <div className="px-6 h-16 flex items-center justify-between bg-slate-200">
        <div>
          <h2 className="uppercase font-semibold text-xl">
            <SnippetsOutlined className="text-primary" /> WebSites Center
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <ModalAddSite
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />

          <ModalAddSitesMany
            showModal={showModalAddMany}
            handleOk={handleOkAddMany}
            handleCancel={handleCancelAddMany}
            isModalOpen={isModalAddManyOpen}
            setIsModalOpen={setIsModalAddManyOpen}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {/* search Name */}
          <Input
            allowClear
            className="w-56"
            placeholder="Tìm theo tên"
            value={params.name}
            onChange={(e) =>
              setParams((pre) => ({ ...pre, name: e.target.value ?? "" }))
            }
          />

          {/* Search url */}
          <Input
            allowClear
            className="w-56"
            placeholder="Tìm theo url"
            value={params.url}
            onChange={(e) =>
              setParams((pre) => ({ ...pre, url: e.target.value ?? "" }))
            }
          />

          {/* Search user */}
          <Input
            allowClear
            className="w-56"
            placeholder="Tìm theo người tạo"
            value={params.user}
            onChange={(e) =>
              setParams((pre) => ({ ...pre, user: e.target.value ?? "" }))
            }
          />

          {/* Button reset filter */}
          <Button
            onClick={() => setParams({ limit: 10 })}
            className="bg-green-400 text-white"
          >
            Làm mới
          </Button>
        </div>
        <TableComponent
          isLoading={isLoading}
          columns={columns}
          data={data}
          countData={countData}
          handlePageChange={handlePageChange}
        />
      </div>

      <ModalEditSite
        obj={objEdit}
        handleOk={handleOkEdit}
        handleCancel={handleCancelEdit}
        isModalOpen={isModalOpenEdit}
        setIsModalOpen={setIsModalOpenEdit}
      />
    </section>
  );
};

export default Sties;
