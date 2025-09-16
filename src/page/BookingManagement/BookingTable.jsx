import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";

const BookingTable = () => {
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
                    { key: "1", no: "1", phoneNumber: "01722222201", email: "john1@example.com", petOwnerName: "John Doe", bookingDate: "2022-01-01" },
                    { key: "2", no: "2", phoneNumber: "01722222202", email: "jane2@example.com", petOwnerName: "Jane Smith", bookingDate: "2022-01-02" },
                    { key: "3", no: "3", phoneNumber: "01722222203", email: "alex3@example.com", petOwnerName: "Alex Johnson", bookingDate: "2022-01-03" },
                    { key: "4", no: "4", phoneNumber: "01722222204", email: "mary4@example.com", petOwnerName: "Mary Williams", bookingDate: "2022-01-04" },
                    { key: "5", no: "5", phoneNumber: "01722222205", email: "peter5@example.com", petOwnerName: "Peter Brown", bookingDate: "2022-01-05" },
                    { key: "6", no: "6", phoneNumber: "01722222206", email: "linda6@example.com", petOwnerName: "Linda Davis", bookingDate: "2022-01-06" },
                    { key: "7", no: "7", phoneNumber: "01722222207", email: "michael7@example.com", petOwnerName: "Michael Miller", bookingDate: "2022-01-07" },
                    { key: "8", no: "8", phoneNumber: "01722222208", email: "susan8@example.com", petOwnerName: "Susan Wilson", bookingDate: "2022-01-08" },
                    { key: "9", no: "9", phoneNumber: "01722222209", email: "david9@example.com", petOwnerName: "David Moore", bookingDate: "2022-01-09" },
                    { key: "10", no: "10", phoneNumber: "01722222210", email: "emma10@example.com", petOwnerName: "Emma Taylor", bookingDate: "2022-01-10" },
                    { key: "11", no: "11", phoneNumber: "01722222211", email: "robert11@example.com", petOwnerName: "Robert Anderson", bookingDate: "2022-01-11" },
                    { key: "12", no: "12", phoneNumber: "01722222212", email: "patricia12@example.com", petOwnerName: "Patricia Thomas", bookingDate: "2022-01-12" },
                    { key: "13", no: "13", phoneNumber: "01722222213", email: "charles13@example.com", petOwnerName: "Charles Jackson", bookingDate: "2022-01-13" },
                    { key: "14", no: "14", phoneNumber: "01722222214", email: "barbara14@example.com", petOwnerName: "Barbara White", bookingDate: "2022-01-14" },
                    { key: "15", no: "15", phoneNumber: "01722222215", email: "james15@example.com", petOwnerName: "James Harris", bookingDate: "2022-01-15" },
                    { key: "16", no: "16", phoneNumber: "01722222216", email: "elizabeth16@example.com", petOwnerName: "Elizabeth Martin", bookingDate: "2022-01-16" },
                    { key: "17", no: "17", phoneNumber: "01722222217", email: "thomas17@example.com", petOwnerName: "Thomas Lee", bookingDate: "2022-01-17" },
                    { key: "18", no: "18", phoneNumber: "01722222218", email: "nancy18@example.com", petOwnerName: "Nancy Perez", bookingDate: "2022-01-18" },
                    { key: "19", no: "19", phoneNumber: "01722222219", email: "daniel19@example.com", petOwnerName: "Daniel Young", bookingDate: "2022-01-19" },
                    { key: "20", no: "20", phoneNumber: "01722222220", email: "karen20@example.com", petOwnerName: "Karen King", bookingDate: "2022-01-20" },
                    { key: "21", no: "21", phoneNumber: "01722222221", email: "matthew21@example.com", petOwnerName: "Matthew Scott", bookingDate: "2022-01-21" },
                    { key: "22", no: "22", phoneNumber: "01722222222", email: "sarah22@example.com", petOwnerName: "Sarah Green", bookingDate: "2022-01-22" },
                    { key: "23", no: "23", phoneNumber: "01722222223", email: "mark23@example.com", petOwnerName: "Mark Adams", bookingDate: "2022-01-23" },
                    { key: "24", no: "24", phoneNumber: "01722222224", email: "laura24@example.com", petOwnerName: "Laura Baker", bookingDate: "2022-01-24" },
                    { key: "25", no: "25", phoneNumber: "01722222225", email: "steven25@example.com", petOwnerName: "Steven Gonzalez", bookingDate: "2022-01-25" },
                    { key: "26", no: "26", phoneNumber: "01722222226", email: "kimberly26@example.com", petOwnerName: "Kimberly Nelson", bookingDate: "2022-01-26" },
                    { key: "27", no: "27", phoneNumber: "01722222227", email: "joseph27@example.com", petOwnerName: "Joseph Carter", bookingDate: "2022-01-27" },
                    { key: "28", no: "28", phoneNumber: "01722222228", email: "michelle28@example.com", petOwnerName: "Michelle Mitchell", bookingDate: "2022-01-28" },
                    { key: "29", no: "29", phoneNumber: "01722222229", email: "kevin29@example.com", petOwnerName: "Kevin Roberts", bookingDate: "2022-01-29" },
                    { key: "30", no: "30", phoneNumber: "01722222230", email: "amanda30@example.com", petOwnerName: "Amanda Turner", bookingDate: "2022-01-30" },
          ];



          const columns = [
                    { title: "No", dataIndex: "no", key: "no" },
                    {
                              title: "Pet Owner Name",
                              key: "petOwnerName",
                              render: (_, record) => (
                                        <div className="flex items-center gap-3">
                                                  <img
                                                            src={`https://avatar.iran.liara.run/public/30`}
                                                            className="w-10 h-10 object-cover rounded-full"
                                                            alt="User Avatar"
                                                  />
                                                  <span>{record?.petOwnerName}</span>
                                        </div>
                              ),
                    },

                    { title: "Email", dataIndex: "email", key: "email" },
                    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
                    { title: "Booking Date", dataIndex: "bookingDate", key: "bookingDate" }

          ];

          return (
                    <>
                              <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
                                        <PageHeading title="Booking Management" />
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

export default BookingTable;