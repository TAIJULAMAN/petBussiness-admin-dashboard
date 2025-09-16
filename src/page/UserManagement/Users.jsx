import { useState } from "react";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { MdBlockFlipped, MdBlock } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table, message, Descriptions, Tag, Avatar } from "antd";
import {
  useGetAllPetOwnersQuery,
  useBlockPetOwnerMutation,
  useUnblockPetOwnerMutation,
} from "../../redux/api/PetOwnerManagement/getAllPetOwnerApi";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); // 'block' or 'unblock'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // API hooks
  const { data: petOwnersData, isLoading, error, refetch } = useGetAllPetOwnersQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm || undefined,
  });
  console.log("petOwnersData",petOwnersData);


  const [blockPetOwner, { isLoading: isBlocking }] = useBlockPetOwnerMutation();
  const [unblockPetOwner, { isLoading: isUnblocking }] = useUnblockPetOwnerMutation();

  const handleOk = async () => {
    if (!selectedUser) return;

    try {
      if (actionType === 'block') {
        await blockPetOwner({ id: selectedUser._id, body: {} }).unwrap();
        message.success('Pet owner blocked successfully!');
      } else if (actionType === 'unblock') {
        await unblockPetOwner({id: selectedUser._id, body: {}}).unwrap();
        message.success('Pet owner unblocked successfully!');
      }
      refetch();
    } catch (error) {
      message.error(`Failed to ${actionType} pet owner: ${error.message || 'Unknown error'}`);
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
      setActionType('');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setActionType('');
  };

  const showModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setIsModalOpen(true);
  };

  const showDetailsModal = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  // Process API data for table
  const dataSource = petOwnersData?.users?.map((user, index) => ({
    key: user._id,
    no: (currentPage - 1) * pageSize + index + 1,
    ...user,
  })) || [];  

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Pet Owner Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record?.profileImage || `https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.name || record?.userName}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          record?.isBlocked 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {record?.isBlocked ? 'Blocked' : 'Active'}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => showDetailsModal(record)}
            className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            title="View Details"
          >
            <IoEyeOutline className="w-6 h-6 text-[#14803c]" />
          </button>
          {record?.isBlocked ? (
            <button
              onClick={() => showModal(record, 'unblock')}
              className="border border-red-600 text-red-600 rounded-lg p-2"
              title="Unblock User"
              disabled={isUnblocking}
            >
              <MdBlock className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => showModal(record, 'block')}
              className="border border-green-600 text-green-600 rounded-lg p-2"
              title="Block User"
              disabled={isBlocking}
            >
              <MdBlockFlipped className="w-6 h-6" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Pet Owner Management" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border-2 border-[#FF62BD] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(19,194,194)",
              colorBorder: "rgb(82,196,26)",
              colorTextPlaceholder: "rgb(82,196,26)",
              colorTextDisabled: "rgb(82,196,26)",
              colorBgTextActive: "rgb(82,196,26)",
              itemActiveBgDisabled: "rgb(82,196,26)",
              itemActiveColorDisabled: "rgb(0,0,0)",
              itemBg: "rgb(82,196,26)",
              colorBgTextHover: "rgb(82,196,26)",
              colorPrimary: "rgb(82,196,26)",
              colorPrimaryHover: "rgb(82,196,26)",
            },
            Table: {
              headerBg: "#14803c",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#14803c",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: petOwnersData?.total || 0, // ✅ use total
          }}
          
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
        />

        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-2xl text-center text-[#0D0D0D] mb-4">
              Are you sure you want to {actionType} {selectedUser?.name || selectedUser?.userName}?
            </h1>

            <div className="text-center py-3">
              <button
                onClick={handleOk}
                disabled={isBlocking || isUnblocking}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBlocking || isUnblocking ? 'Processing...' : `Yes, ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`}
              </button>
            </div>
            <div className="text-center pb-3">
              <button
                onClick={handleCancel}
                disabled={isBlocking || isUnblocking}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* User Details Modal */}
        <Modal
          open={isDetailsModalOpen}
          onCancel={handleDetailsModalClose}
          footer={null}
          width={800}
          title={
            <div className="flex items-center gap-3 pb-4">
              <Avatar 
                size={64} 
                src={selectedUser?.profileImage || `https://avatar.iran.liara.run/public/${selectedUser?.no}`}
              />
              <div>
                <h2 className="text-xl font-semibold text-[#0D0D0D]">
                  {selectedUser?.name || selectedUser?.userName}
                </h2>
                <Tag color={selectedUser?.isBlocked ? 'red' : 'green'}>
                  {selectedUser?.isBlocked ? 'Blocked' : 'Active'}
                </Tag>
              </div>
            </div>
          }
        >
          <div className="p-4">
            <Descriptions 
              bordered 
              column={1}
              size="middle"
              labelStyle={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
            >
              <Descriptions.Item label="Full Name">
                {selectedUser?.name || selectedUser?.userName || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedUser?.email || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {selectedUser?.phone || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {selectedUser?.role || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedUser?.address || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {selectedUser?.dateOfBirth ? new Date(selectedUser.dateOfBirth).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {selectedUser?.gender || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Registration Date">
                {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {selectedUser?.updatedAt ? new Date(selectedUser.updatedAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Account Status">
                <Tag color={selectedUser?.isBlocked ? 'red' : 'green'}>
                  {selectedUser?.isBlocked ? 'Blocked' : 'Active'}
                </Tag>
              </Descriptions.Item>
              {selectedUser?.pets && selectedUser.pets.length > 0 && (
                <Descriptions.Item label="Number of Pets">
                  {selectedUser.pets.length}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Users;
