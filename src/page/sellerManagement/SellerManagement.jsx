<<<<<<< HEAD
import { ConfigProvider, Modal, Table, message, Descriptions, Tag, Avatar } from "antd";
import { MdBlockFlipped, MdBlock } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch, IoEyeOutline } from "react-icons/io5";
=======
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch } from "react-icons/io5";
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
import { BsPatchCheckFill } from "react-icons/bs";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
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
=======

const SellerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const dataSource = [
    {
      key: "1",
      no: "1",
      shopownerName: "Shah Aman",
      shopName: "Shop A",
      Date: "01/01/2025",
      shopAddress: "123 Main St, New York, NY 10001",
    },
    {
      key: "2",
      no: "2",
      shopownerName: "Lisa Ray",
      shopName: "Shop B",
      Date: "02/01/2025",
      shopAddress: "456 Elm St, Chicago, IL 60601",
    },
    {
      key: "3",
      no: "3",
      shopownerName: "John Doe",
      shopName: "Shop C",
      Date: "03/01/2025",
      shopAddress: "789 Oak St, Los Angeles, CA 90001",
    },
    {
      key: "4",
      no: "4",
      shopownerName: "Mary Jane",
      shopName: "Shop D",
      Date: "04/01/2025",
      shopAddress: "101 Pine St, Houston, TX 77001",
    },
    {
      key: "5",
      no: "5",
      shopownerName: "Tom Hardy",
      shopName: "Shop E",
      Date: "05/01/2025",
      shopAddress: "202 Maple St, Miami, FL 33101",
    },
    {
      key: "6",
      no: "6",
      shopownerName: "Sofia Loren",
      shopName: "Shop F",
      Date: "06/01/2025",
      shopAddress: "303 Birch St, Seattle, WA 98101",
    },
    {
      key: "7",
      no: "7",
      shopownerName: "Chris Evans",
      shopName: "Shop G",
      Date: "07/01/2025",
      shopAddress: "404 Cedar St, Boston, MA 02101",
    },
    {
      key: "8",
      no: "8",
      shopownerName: "Emma Watson",
      shopName: "Shop H",
      Date: "08/01/2025",
      shopAddress: "505 Walnut St, Denver, CO 80201",
    },
    {
      key: "9",
      no: "9",
      shopownerName: "Mark Ruffalo",
      shopName: "Shop I",
      Date: "09/01/2025",
      shopAddress: "606 Chestnut St, Atlanta, GA 30301",
    },
    {
      key: "10",
      no: "10",
      shopownerName: "Scarlett Johansson",
      shopName: "Shop J",
      Date: "10/01/2025",
      shopAddress: "707 Spruce St, San Francisco, CA 94101",
    },
    {
      key: "11",
      no: "11",
      shopownerName: "Robert Downey",
      shopName: "Shop K",
      Date: "11/01/2025",
      shopAddress: "808 Ash St, Dallas, TX 75201",
    },
    {
      key: "12",
      no: "12",
      shopownerName: "Natalie Portman",
      shopName: "Shop L",
      Date: "12/01/2025",
      shopAddress: "909 Poplar St, Phoenix, AZ 85001",
    },
    {
      key: "13",
      no: "13",
      shopownerName: "Chris Hemsworth",
      shopName: "Shop M",
      Date: "13/01/2025",
      shopAddress: "1010 Fir St, Philadelphia, PA 19101",
    },
    {
      key: "14",
      no: "14",
      shopownerName: "Gal Gadot",
      shopName: "Shop N",
      Date: "14/01/2025",
      shopAddress: "1111 Willow St, Portland, OR 97201",
    },
    {
      key: "15",
      no: "15",
      shopownerName: "Hugh Jackman",
      shopName: "Shop O",
      Date: "15/01/2025",
      shopAddress: "1212 Cypress St, Minneapolis, MN 55401",
    },
    {
      key: "16",
      no: "16",
      shopownerName: "Anne Hathaway",
      shopName: "Shop P",
      Date: "16/01/2025",
      shopAddress: "1313 Dogwood St, Nashville, TN 37201",
    },
    {
      key: "17",
      no: "17",
      shopownerName: "Leonardo DiCaprio",
      shopName: "Shop Q",
      Date: "17/01/2025",
      shopAddress: "1414 Magnolia St, Charlotte, NC 28201",
    },
    {
      key: "18",
      no: "18",
      shopownerName: "Meryl Streep",
      shopName: "Shop R",
      Date: "18/01/2025",
      shopAddress: "1515 Redwood St, Detroit, MI 48201",
    },
    {
      key: "19",
      no: "19",
      shopownerName: "Morgan Freeman",
      shopName: "Shop S",
      Date: "19/01/2025",
      shopAddress: "1616 Sycamore St, Columbus, OH 43201",
    },
    {
      key: "20",
      no: "20",
      shopownerName: "Jennifer Lawrence",
      shopName: "Shop T",
      Date: "20/01/2025",
      shopAddress: "1717 Aspen St, Indianapolis, IN 46201",
    },
    {
      key: "21",
      no: "21",
      shopownerName: "Brad Pitt",
      shopName: "Shop U",
      Date: "21/01/2025",
      shopAddress: "1818 Hickory St, Austin, TX 73301",
    },
    {
      key: "22",
      no: "22",
      shopownerName: "Angelina Jolie",
      shopName: "Shop V",
      Date: "22/01/2025",
      shopAddress: "1919 Cottonwood St, Jacksonville, FL 32099",
    },
    {
      key: "23",
      no: "23",
      shopownerName: "Tom Cruise",
      shopName: "Shop W",
      Date: "23/01/2025",
      shopAddress: "2020 Hemlock St, Fort Worth, TX 76101",
    },
    {
      key: "24",
      no: "24",
      shopownerName: "Julia Roberts",
      shopName: "Shop X",
      Date: "24/01/2025",
      shopAddress: "2121 Alder St, Columbus, GA 31901",
    },
    {
      key: "25",
      no: "25",
      shopownerName: "Will Smith",
      shopName: "Shop Y",
      Date: "25/01/2025",
      shopAddress: "2222 Beech St, Memphis, TN 38101",
    },
    {
      key: "26",
      no: "26",
      shopownerName: "Emma Stone",
      shopName: "Shop Z",
      Date: "26/01/2025",
      shopAddress: "2323 Chestnut St, Baltimore, MD 21201",
    },
    {
      key: "27",
      no: "27",
      shopownerName: "Denzel Washington",
      shopName: "Shop AA",
      Date: "27/01/2025",
      shopAddress: "2424 Maple St, Milwaukee, WI 53201",
    },
    {
      key: "28",
      no: "28",
      shopownerName: "Kate Winslet",
      shopName: "Shop AB",
      Date: "28/01/2025",
      shopAddress: "2525 Elm St, Albuquerque, NM 87101",
    },
    {
      key: "29",
      no: "29",
      shopownerName: "Ryan Gosling",
      shopName: "Shop AC",
      Date: "29/01/2025",
      shopAddress: "2626 Pine St, Tucson, AZ 85701",
    },
    {
      key: "30",
      no: "30",
      shopownerName: "Jessica Chastain",
      shopName: "Shop AD",
      Date: "30/01/2025",
      shopAddress: "2727 Oak St, Fresno, CA 93701",
    },
  ];
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
<<<<<<< HEAD
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
            <Link to="/chat">
              <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
                title="Chat"
              >
                <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
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
=======
      title: "Shop Owner Name",
      key: "shopownerName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.shopownerName}</span>
        </div>
      ),
    },
    { title: "Shop Name", dataIndex: "shopName", key: "shopName" },
    { title: "Date", dataIndex: "Date", key: "Date" },
    { title: "Location", dataIndex: "shopAddress", key: "shopAddress" },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-2">
            <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
              <BsPatchCheckFill className="w-6 h-6 text-[#14803c]" />
            </button>
            <Link to="/chat">
              <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
                <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
            <button
              onClick={showModal}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <MdBlockFlipped className="w-6 h-6 text-[#14803c]" />
            </button>
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
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
<<<<<<< HEAD
            value={searchTerm}
            onChange={handleSearch}
=======
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
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
<<<<<<< HEAD
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
=======
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
<<<<<<< HEAD
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
=======
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to block ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Block
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleOk}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Block
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
              </button>
            </div>
          </div>
        </Modal>
<<<<<<< HEAD

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
=======
>>>>>>> e1180e79de3219403ba9481a9cff3546dd43ca62
      </ConfigProvider>
    </>
  );
};

export default SellerManagement;
