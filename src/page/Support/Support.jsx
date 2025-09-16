import { ConfigProvider, Modal, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { FaEye } from "react-icons/fa";
import { useState, useMemo } from "react";
import { useGetAllSupportQuery } from "../../redux/api/supportApi";

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // API hooks
  const { data: supportData } = useGetAllSupportQuery();
  console.log("Support Data:", supportData);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSupport(null);
  };

  const showModal = (support) => {
    setSelectedSupport(support);
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // Process API data for table
  const dataSource = useMemo(() => {
    if (!supportData?.helps) return [];

    return supportData?.helps?.map((support, index) => ({
      key: support?._id,
      no: (currentPage - 1) * pageSize + index + 1,
      email: support.email || "",
      subject: support.subject || "No Subject",
      message: support.message || support.description || "",
      date: support.createdAt
        ? new Date(support.createdAt).toLocaleDateString()
        : "N/A",
      status: support.status || "pending",
      ...support,
    }));
  }, [supportData, currentPage, pageSize]);

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Subject", dataIndex: "message", key: "message" },
    { title: "Date", dataIndex: "date", key: "date" },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="">
            <button
              onClick={() => showModal(record)}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <FaEye className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Support" />
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
          pagination={false}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
        />

        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <div className="p-5">
            <h1 className="text-xl text-center text-[#0D0D0D] mb-4">
              Support Details
            </h1>

            {selectedSupport && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={`https://avatar.iran.liara.run/public/${selectedSupport.no}`}
                    className="w-12 h-12 object-cover rounded-full"
                    alt="User Avatar"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedSupport.userName}
                    </h3>
                    <p className="text-gray-600">{selectedSupport.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-semibold text-gray-700">
                      Subject:
                    </label>
                    <p className="text-gray-900">{selectedSupport.subject}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700">Date:</label>
                    <p className="text-gray-900">{selectedSupport.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="font-semibold text-gray-700">Status:</label>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedSupport.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : selectedSupport.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedSupport.status?.charAt(0)?.toUpperCase() +
                      selectedSupport.status?.slice(1)}
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Message:
                  </label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedSupport.message || "No message provided"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Support;
