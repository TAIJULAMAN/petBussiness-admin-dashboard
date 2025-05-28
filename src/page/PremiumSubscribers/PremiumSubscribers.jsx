import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { useState } from "react";

const PremiumSubscribers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      no: "1",
      userName: "Shah Aman",
      date: "12/04/24",
      contactNumber: "555-0101",
      email: "shah.aman@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "2",
      no: "2",
      userName: "Hossain Ali",
      date: "12/04/24",
      contactNumber: "555-0102",
      email: "hossain.ali@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "3",
      no: "3",
      userName: "Rana Rahman",
      date: "12/04/24",
      contactNumber: "555-0103",
      email: "rana.rahman@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "4",
      no: "4",
      userName: "Zahid Hasan",
      date: "12/04/24",
      contactNumber: "555-0104",
      email: "zahid.hasan@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "5",
      no: "5",
      userName: "Fariha Begum",
      date: "12/04/24",
      contactNumber: "555-0105",
      email: "fariha.begum@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "6",
      no: "6",
      userName: "Khaled Anwar",
      date: "12/04/24",
      contactNumber: "555-0106",
      email: "khaled.anwar@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "7",
      no: "7",
      userName: "Sana Zaman",
      date: "12/04/24",
      contactNumber: "555-0107",
      email: "sana.zaman@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "8",
      no: "8",
      userName: "Tariq Khan",
      date: "12/04/24",
      contactNumber: "555-0108",
      email: "tariq.khan@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "9",
      no: "9",
      userName: "Shahid Reza",
      date: "12/04/24",
      contactNumber: "555-0109",
      email: "shahid.reza@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "10",
      no: "10",
      userName: "Nashit Raza",
      date: "12/04/24",
      contactNumber: "555-0110",
      email: "nashit.raza@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "11",
      no: "11",
      userName: "Mia Junaid",
      date: "12/04/24",
      contactNumber: "555-0111",
      email: "mia.junaid@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "12",
      no: "12",
      userName: "Arif Kabir",
      date: "12/04/24",
      contactNumber: "555-0112",
      email: "arif.kabir@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "13",
      no: "13",
      userName: "Sabrina Mistry",
      date: "12/04/24",
      contactNumber: "555-0113",
      email: "sabrina.mistry@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "14",
      no: "14",
      userName: "Nabila Islam",
      date: "12/04/24",
      contactNumber: "555-0114",
      email: "nabila.islam@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "15",
      no: "15",
      userName: "Omar Ali",
      date: "12/04/24",
      contactNumber: "555-0115",
      email: "omar.ali@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "16",
      no: "16",
      userName: "Hina Khalid",
      date: "12/04/24",
      contactNumber: "555-0116",
      email: "hina.khalid@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "17",
      no: "17",
      userName: "Zakir Ahmed",
      date: "12/04/24",
      contactNumber: "555-0117",
      email: "zakir.ahmed@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "18",
      no: "18",
      userName: "Maya Noor",
      date: "12/04/24",
      contactNumber: "555-0118",
      email: "maya.noor@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "19",
      no: "19",
      userName: "Arman Tarek",
      date: "12/04/24",
      contactNumber: "555-0119",
      email: "arman.tarek@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "20",
      no: "20",
      userName: "Shamna Haque",
      date: "12/04/24",
      contactNumber: "555-0120",
      email: "shamna.haque@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "21",
      no: "21",
      userName: "Asif Iqbal",
      date: "12/04/24",
      contactNumber: "555-0121",
      email: "asif.iqbal@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "22",
      no: "22",
      userName: "Nadia Islam",
      date: "12/04/24",
      contactNumber: "555-0122",
      email: "nadia.islam@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "23",
      no: "23",
      userName: "Mohammad Zubair",
      date: "12/04/24",
      contactNumber: "555-0123",
      email: "mohammad.zubair@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "24",
      no: "24",
      userName: "Sadiya Noor",
      date: "12/04/24",
      contactNumber: "555-0124",
      email: "sadiya.noor@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "25",
      no: "25",
      userName: "Zain Ali",
      date: "12/04/24",
      contactNumber: "555-0125",
      email: "zain.ali@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "26",
      no: "26",
      userName: "Khondaker Zubair",
      date: "12/04/24",
      contactNumber: "555-0126",
      email: "khondaker.zubair@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "27",
      no: "27",
      userName: "Dina Begum",
      date: "12/04/24",
      contactNumber: "555-0127",
      email: "dina.begum@example.com",
      subscriptionPlan: "Pro",
    },
    {
      key: "28",
      no: "28",
      userName: "Moinul Raza",
      date: "12/04/24",
      contactNumber: "555-0128",
      email: "moinul.raza@example.com",
      subscriptionPlan: "Basic",
    },
    {
      key: "29",
      no: "29",
      userName: "Rubina Sultana",
      date: "12/04/24",
      contactNumber: "555-0129",
      email: "rubina.sultana@example.com",
      subscriptionPlan: "Premium",
    },
    {
      key: "30",
      no: "30",
      userName: "Salman Khan",
      date: "12/04/24",
      contactNumber: "555-0130",
      email: "salman.khan@example.com",
      subscriptionPlan: "Pro",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record?.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record?.userName}</span>
        </div>
      ),
    },
    { title: "Joining Date", dataIndex: "date", key: "date" },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
      render: (subscriptionPlan) => {
        const bgColors = {
          Basic: "bg-blue-100 text-blue-800",
          Premium: "bg-purple-100 text-purple-800",
          Pro: "bg-green-100 text-green-800"
        };
        return (
          <span className={`px-2 py-2 rounded-full text-sm font-medium ${bgColors[subscriptionPlan]}`}>
            {subscriptionPlan}
          </span>
        );
      }
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-2">
            <button
              // onClick={showModal}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <IoEyeOutline className="w-6 h-6 text-[#14803c]" />
            </button>
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
        <PageHeading title="Subscriber Management" />
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

export default PremiumSubscribers;
