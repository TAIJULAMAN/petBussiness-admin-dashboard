import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
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
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
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
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SellerManagement;
