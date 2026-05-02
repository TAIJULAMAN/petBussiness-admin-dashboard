import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Table } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetAllbookingManagementQuery } from "../../redux/api/bookingManagementApi";

const BookingManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: bookData, isLoading } = useGetAllbookingManagementQuery({
    page: currentPage,
    limit: pageSize,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const services = bookData?.services || [];
  const normalizedQuery = (searchTerm || "").toLowerCase();
  const filteredServices = normalizedQuery
    ? services.filter((item) => {
        const shopName = (item?.businessName || "").toLowerCase();
        return shopName.includes(normalizedQuery);
      })
    : services;

  const apiTotal = bookData?.data?.meta?.total || bookData?.meta?.total || bookData?.total;
  const isServerPaginated = apiTotal !== undefined && apiTotal > services.length;

  const dataSource = filteredServices.map((item, index) => ({
    key: item?.serviceId,
    no: isServerPaginated ? (currentPage - 1) * pageSize + index + 1 : index + 1,
    serviceId: item?.serviceId,
    shopName: item.businessName || "N/A",
    bookingCategory: item?.serviceType || "N/A",
    appointmentCount: item?.totalBookings || 0,
    closingTime: item?.closingTime || "N/A",
    offDay: item?.offDay || "N/A",
    openingTime: item?.openingTime || "N/A",
    phone: item?.phone || "N/A",
    ownerName: item?.ownerName || "N/A",
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Shop Name",
      key: "shopName",
      dataIndex: "shopName",
    },
    {
      title: "Owner Name",
      key: "ownerName",
      dataIndex: "ownerName",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Booking Category",
      dataIndex: "bookingCategory",
      key: "bookingCategory",
    },
    {
      title: "Appointment",
      dataIndex: "appointmentCount",
      key: "appointmentCount",
    },
    {
      title: "Off Day",
      key: "offDay",
      dataIndex: "offDay",
    },
    {
      title: "Opening Time",
      key: "openingTime",
      dataIndex: "openingTime",
    },
    {
      title: "Closing Time",
      key: "closingTime",
      dataIndex: "closingTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => {
        return (
          <div className="flex gap-2">
            <Link to={`/bookingTable/${record?.serviceId}`}>
              <button className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200">
                <IoEyeOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Booking Management" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search by Shop Name..."
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
            total: apiTotal || filteredServices.length,
          }}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
        />
      </ConfigProvider>
    </>
  );
};

export default BookingManagement;
