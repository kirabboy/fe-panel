import { DeleteFilled, EditFilled, TeamOutlined } from "@ant-design/icons";
import ModalAddTeam from "./components/ModalAddTeam";
import { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table, message } from "antd";
import { deleteUserById, getTeam } from "../../api/team";
import ModalEditTeam from "./components/ModalEditTeam";
import moment from 'moment';

const Teams = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [objEdit, setObjEdit] = useState({});
    const [data, setData] = useState([]);
    const [countData, setCountData] = useState(0);
    const [params, setParams] = useState({
        limit: 10,
        offset: 1
    });

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

    const handlePageChange = async (page, pageSize) => {
        params.offset = page;
        params.limit = pageSize;
        fetchData();
    };

    const confirm = async (values) => {
        try {
            const res = await deleteUserById(values);
            if (res?.statusCode === 200) {
                message.success('Xoá team thành công');
                fetchData();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await getTeam(params);
            if (res.statusCode === 200) {
                setData(res.data.result);
                setCountData(res.data.total);
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const columns = [
        {
            key: 'name',
            title: 'Tên team',
            dataIndex: 'name',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            render: (record) => {
                return (
                    <>{moment(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</>
                )
            },
            hideInSearch: true,
        },
        {
            title: 'Thao tác',
            width: 200,
            key: 'action',
            render: (obj) => (
                <Space>
                    <Button
                        type='primary'
                        icon={<EditFilled />}
                        onClick={() => showModalEdit(obj)}
                    />
                    {!obj.isAdmin && (
                        <Popconfirm
                            title={`Xóa team: ${obj?.name}`}
                            description={`Bạn có chắc chắn muốn xóa team: ${obj?.name} này không?`}
                            onConfirm={() => confirm(obj?.id)}
                            okText='Có'
                            cancelText='Không'>
                            <Button
                                danger
                                icon={<DeleteFilled />}
                            />
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className='w-full'>
            <div className='w-full gap-2 px-6  h-16 flex items-center justify-between bg-slate-200'>
                <h2 className='uppercase font-semibold text-xl'>
                    <TeamOutlined className='text-primary' /> Team
                </h2>
                <ModalAddTeam
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
                        setParams((pre) => ({ ...pre, keyword: e.target.value ?? '', limit: 10, offset: 1 }))
                    }
                    onClear={true}
                    className='w-64'
                    placeholder='Tìm theo tên'
                />
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={data}
                    showSorterTooltip={{
                        target: 'sorter-icon',
                    }}
                    pagination={{
                        current: params.offset,
                        pageSize: params.limit,
                        total: countData,
                        onChange: (page, pageSize) => {
                            handlePageChange(page, pageSize);
                        },
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                />
            </div>
            <ModalEditTeam
                obj={objEdit}
                handleOk={handleOkEdit}
                handleCancel={handleCancelEdit}
                isModalOpen={isModalOpenEdit}
                setIsModalOpen={setIsModalOpenEdit}
            />
        </div>
    );
}

export default Teams;