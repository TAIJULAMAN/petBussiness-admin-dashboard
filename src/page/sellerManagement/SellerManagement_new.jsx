import { ConfigProvider, Modal, Table, message, Descriptions, Tag, Avatar } from "antd";
import { MdBlockFlipped, MdBlock } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch, IoEyeOutline } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllBusinessOwnersQuery,
  useBlockBusinessOwnerMutation,
  useUnblockBusinessOwnerMutation,
} from "../../redux/api/BusinessOwnerManagement/businessOwnerManagementApi";

const SellerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); // 'block' or 'unblock'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // API hooks
  const { data: businessOwnersData, isLoading, error, refetch } = useGetAllBusinessOwnersQuery({
    page: currentPage,
    limit: pageSize,
    search: searchTerm || undefined,
  });

  // Show error message if API call fails
  if (error) {
    message.error(`Failed to load business owners: ${error.message || 'Unknown error'}`);
  }

  const [blockBusinessOwner, { isLoading: isBlocking }] = useBlockBusinessOwnerMutation();
  const [unblockBusinessOwner, { isLoading: isUnblocking }] = useUnblockBusinessOwnerMutation();

  const handleOk = async () => {
    if (!selectedUser) return;

    try {
      if (actionType === 'block') {
        await blockBusinessOwner(selectedUser._id).unwrap();
        message.success('Business owner blocked successfully!');
      } else if (actionType === 'unblock') {
        await unblockBusinessOwner(selectedUser._id).unwrap();
        message.success('Business owner unblocked successfully!');
      }
      refetch();
    } catch (error) {
      message.error(`Failed to ${actionType} business owner: ${error.message || 'Unknown error'}`);
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
  const dataSource = businessOwnersData?.owners?.map((owner, index) => ({
    key: owner._id,
    no: (currentPage - 1) * pageSize + index + 1,
    ...owner,
  })) || [];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Business Owner Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record?.profileImage || `https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.name}</span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Verified",
      key: "isVerified",
      render: (_, record) => (
        <Tag color={record?.isVerified ? 'green' : 'red'}>
          {record?.isVerified ? 'Verified' : 'Not Verified'}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record?.isBlocked ? 'red' : 'green'}>
          {record?.isBlocked ? 'Blocked' : 'Active'}
        </Tag>
      ),
    },
    { 
      title: "Registration Date", 
      key: "createdAt",
      render: (_, record) => (
        record?.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button 
              onClick={() => showDetailsModal(record)}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
              title="View Details"
            >
              <IoEyeOutline className="w-6 h-6 text-[#14803c]" />
            </button>
            <button 
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
              title="Verify Business"
            >
              <BsPatchCheckFill className="w-6 h-6 text-[#14803c]" />
            </button>
            {record?.isBlocked ? (
              <button
                onClick={() => showModal(record, 'unblock')}
                className="border border-green-600 text-green-600 rounded-lg p-2 bg-green-100 hover:bg-green-200 transition duration-200"
                title="Unblock Business Owner"
                disabled={isUnblocking}
              >
                <MdBlock className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => showModal(record, 'block')}
                className="border border-red-600 text-red-600 rounded-lg p-2 bg-red-100 hover:bg-red-200 transition duration-200"
                title="Block Business Owner"
                disabled={isBlocking}
              >
                <MdBlockFlipped className="w-6 h-6" />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Business Owner Management" />
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
            total: businessOwnersData?.total || 0,
          }}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
        />
        
        {/* Block/Unblock Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-2xl text-center text-[#0D0D0D] mb-4">
              Are you sure you want to {actionType} {selectedUser?.name}?
            </h1>

            <div className="text-center py-3">
              <button
                onClick={handleOk}
                disabled={isBlocking || isUnblocking}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBlocking || isUnblocking ? 'Processing...' : `Yes, ${actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}`}
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

        {/* Business Owner Details Modal */}
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
                  {selectedUser?.name}
                </h2>
                <div className="flex gap-2">
                  <Tag color={selectedUser?.isBlocked ? 'red' : 'green'}>
                    {selectedUser?.isBlocked ? 'Blocked' : 'Active'}
                  </Tag>
                  <Tag color={selectedUser?.isVerified ? 'green' : 'red'}>
                    {selectedUser?.isVerified ? 'Verified' : 'Not Verified'}
                  </Tag>
                </div>
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
                {selectedUser?.name || 'N/A'}
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
              <Descriptions.Item label="Verification Status">
                <Tag color={selectedUser?.isVerified ? 'green' : 'red'}>
                  {selectedUser?.isVerified ? 'Verified' : 'Not Verified'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Account Status">
                <Tag color={selectedUser?.isBlocked ? 'red' : 'green'}>
                  {selectedUser?.isBlocked ? 'Blocked' : 'Active'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Registration Date">
                {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {selectedUser?.updatedAt ? new Date(selectedUser.updatedAt).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              {selectedUser?.bookings && (
                <Descriptions.Item label="Total Bookings">
                  {selectedUser.bookings.length || 0}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SellerManagement;
