/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const RecentSellerRequests = ({ showModal }) => {
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
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Shop Owner  Name",
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
            <button className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200">
              <MdBlockFlipped
                onClick={showModal}
                className="w-6 h-6 text-[#14803c]"
              />
            </button>
          </div>
        );
      },
    },
  ];

  return (
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
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
};

export default RecentSellerRequests;
