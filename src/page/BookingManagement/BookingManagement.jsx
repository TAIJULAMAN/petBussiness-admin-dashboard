import { IoEyeOutline, IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const BookingManagement = () => {
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
                    { key: "1", no: "1", shopName: "Shah Aman", bookingCategory: "Pet Vets", appointmentCount: "50" },
                    { key: "2", no: "2", shopName: "Happy Paws", bookingCategory: "Pet Grooming", appointmentCount: "30" },
                    { key: "3", no: "3", shopName: "Care Clinic", bookingCategory: "Pet Vets", appointmentCount: "45" },
                    { key: "4", no: "4", shopName: "Purrfect Pets", bookingCategory: "Pet Grooming", appointmentCount: "20" },
                    { key: "5", no: "5", shopName: "Fur Friends", bookingCategory: "Pet Boarding", appointmentCount: "15" },
                    { key: "6", no: "6", shopName: "Pet Paradise", bookingCategory: "Pet Vets", appointmentCount: "60" },
                    { key: "7", no: "7", shopName: "Woof World", bookingCategory: "Pet Grooming", appointmentCount: "25" },
                    { key: "8", no: "8", shopName: "Animal Care", bookingCategory: "Pet Vets", appointmentCount: "55" },
                    { key: "9", no: "9", shopName: "Paws & Claws", bookingCategory: "Pet Grooming", appointmentCount: "40" },
                    { key: "10", no: "10", shopName: "The Vet Spot", bookingCategory: "Pet Vets", appointmentCount: "35" },
                    { key: "11", no: "11", shopName: "Cozy Kennels", bookingCategory: "Pet Boarding", appointmentCount: "22" },
                    { key: "12", no: "12", shopName: "Whisker Care", bookingCategory: "Pet Grooming", appointmentCount: "28" },
                    { key: "13", no: "13", shopName: "Healthy Tails", bookingCategory: "Pet Vets", appointmentCount: "48" },
                    { key: "14", no: "14", shopName: "Doggy Daycare", bookingCategory: "Pet Boarding", appointmentCount: "18" },
                    { key: "15", no: "15", shopName: "Feline Friends", bookingCategory: "Pet Grooming", appointmentCount: "32" },
                    { key: "16", no: "16", shopName: "Pet Health", bookingCategory: "Pet Vets", appointmentCount: "53" },
                    { key: "17", no: "17", shopName: "Tail Waggers", bookingCategory: "Pet Grooming", appointmentCount: "26" },
                    { key: "18", no: "18", shopName: "Bark & Bath", bookingCategory: "Pet Grooming", appointmentCount: "37" },
                    { key: "19", no: "19", shopName: "Vet Care Plus", bookingCategory: "Pet Vets", appointmentCount: "42" },
                    { key: "20", no: "20", shopName: "Happy Kennels", bookingCategory: "Pet Boarding", appointmentCount: "20" },
                    { key: "21", no: "21", shopName: "Puppy Palace", bookingCategory: "Pet Boarding", appointmentCount: "23" },
                    { key: "22", no: "22", shopName: "Groom & Glow", bookingCategory: "Pet Grooming", appointmentCount: "31" },
                    { key: "23", no: "23", shopName: "Animal Wellness", bookingCategory: "Pet Vets", appointmentCount: "49" },
                    { key: "24", no: "24", shopName: "Fur & Feather", bookingCategory: "Pet Grooming", appointmentCount: "27" },
                    { key: "25", no: "25", shopName: "Pawsitive Care", bookingCategory: "Pet Vets", appointmentCount: "44" },
                    { key: "26", no: "26", shopName: "K9 Groomers", bookingCategory: "Pet Grooming", appointmentCount: "33" },
                    { key: "27", no: "27", shopName: "Vet Zone", bookingCategory: "Pet Vets", appointmentCount: "41" },
                    { key: "28", no: "28", shopName: "Pet Stay", bookingCategory: "Pet Boarding", appointmentCount: "19" },
                    { key: "29", no: "29", shopName: "The Groom Room", bookingCategory: "Pet Grooming", appointmentCount: "29" },
                    { key: "30", no: "30", shopName: "Healthy Paws", bookingCategory: "Pet Vets", appointmentCount: "47" },
          ];


          const columns = [
                    { title: "No", dataIndex: "no", key: "no" },
                    {
                              title: "Shop Name",
                              key: "shopName",
                              render: (_, record) => (
                                        <div className="flex items-center gap-3">
                                                  <img
                                                            src={`https://avatar.iran.liara.run/public/30`}
                                                            className="w-10 h-10 object-cover rounded-full"
                                                            alt="User Avatar"
                                                  />
                                                  <span>{record?.shopName}</span>
                                        </div>
                              ),
                    },
                    { title: "Booking Category", dataIndex: "bookingCategory", key: "bookingCategory" },
                    { title: "Appointment Count", dataIndex: "appointmentCount", key: "appointmentCount" },
                    {
                              title: "Action",
                              key: "action",
                              render: () => {
                                        return (
                                                  <div className="flex gap-2">
                                                          <Link to="/bookingTable">
                                                            <button
                                                                      // onClick={showModal}
                                                                      className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
                                                            >
                                                                      <IoEyeOutline className="w-6 h-6 text-[#14803c]" />
                                                            </button>
                                                          </Link>
                                                  </div>
                                        );
                              },
                    }
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

export default BookingManagement;