import { ConfigProvider, Modal, Table, Tag } from "antd";
import PageHeading from "../../shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

const CategoryManagement = () => {
  const [categoryName, setCategoryName] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addModalOpen2, setAddModalOpen2] = useState(false);
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
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const showModal3 = () => {
    setAddModalOpen(true);
  };
  const handleCancel3 = () => {
    setAddModalOpen2(false);
  };
  const showModal4 = () => {
    setAddModalOpen2(true);
  };

  const [cities, setCities] = useState([
    { id: 1, name: "", features: "" },
    { id: 2, name: "", features: "" },
    { id: 3, name: "", features: "" },
  ]);

  const handleAddCity = () => {
    const newId =
      cities.length > 0 ? Math.max(...cities.map((city) => city.id)) + 1 : 1;
    setCities([...cities, { id: newId, name: "", features: "" }]);
  };

  const handleClearCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  const dataSource = [
    {
      key: "1",
      no: "1",
      categoryName: "Pet Vets",
      subCategoriesName:
        "Vaccinations, Surgery, Dental Care, Wellness Exams, Emergency Care, Diagnostics",
    },
    {
      key: "2",
      no: "2",
      categoryName: "Pet shops",
      subCategoriesName:
        "Pet Food, Toys, Collars & Leashes, Bedding, Aquatic Supplies, Treats, Grooming Products",
    },
    {
      key: "3",
      no: "3",
      categoryName: "Pet Grooming",
      subCategoriesName:
        "Bathing, Haircuts, Nail Trimming, Ear Cleaning, De-shedding, Styling, Spa Treatments",
    },
    {
      key: "4",
      no: "4",
      categoryName: "Pet Hotels",
      subCategoriesName:
        "Boarding, Daycare, Training, Play Areas, Feeding Services, Medical Care, Special Needs Care",
    },
    {
      key: "5",
      no: "5",
      categoryName: "Pet Training",
      subCategoriesName:
        "Obedience Training, Agility Training, Behavior Modification, Puppy Training, Private Lessons",
    },
    {
      key: "6",
      no: "6",
      categoryName: "Friendly Place",
      subCategoriesName:
        "Pet Friendly Cafes, Parks, Beaches, Hotels, Hiking Trails, Events, Social Meetups",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Category Name",
      key: "categoryName",
      dataIndex: "categoryName",
    },
    {
      title: "Sub Category Name",
      dataIndex: "subCategoriesName",
      key: "subCategoriesName",
      render: (text) => {
        const subCategories = text.split(",").map((item) => item.trim());
        return (
          <div className="flex flex-wrap gap-2">
            {subCategories.map((subCategory, index) => (
              <Tag key={index} color="green">
                {subCategory}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-2">
            <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
              <CiEdit onClick={showModal3} className="w-6 h-6 text-[#14803c]" />
            </button>
            <button
              onClick={showModal}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <RiDeleteBin6Line className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Category Management" />
        <button
          onClick={showModal4}
          className="bg-[#FF62BD] text-white px-4 py-3 rounded-lg"
        >
          + Add Category
        </button>
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
              Are you sure you want to Delete ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Delete
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleOk}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Delete
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={addModalOpen}
          centered
          onCancel={handleCancel2}
          footer={null}
        >
          <div className="p-5">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Edit Category</h2>
              <p className="text-gray-600">Edit the category details below</p>
            </div>

            {/* Category Name Input */}
            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Catagory Name</label>
              <input
                type="text"
                placeholder="Enter Name here"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {cities.map((city, index) => (
                <div key={city.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-medium">
                      Sub Categories {String(index + 1).padStart(2, "0")}
                    </label>
                    <button
                      onClick={() => handleClearCity(city.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <RxCross2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    placeholder={`Features ${String(index + 1).padStart(
                      2,
                      "0"
                    )}`}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center my-4 text-white">
              <div className="flex justify-center items-center text-center">
                <button
                  onClick={handleAddCity}
                  className="rounded-full bg-green-600  text-white p-2"
                >
                  <GoPlus className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleCancel2}
                className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCancel2}
                className="py-2 px-4 rounded-lg bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={addModalOpen2}
          centered
          onCancel={handleCancel3}
          footer={null}
        >
          <div className="p-5">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Add Category</h2>
              <p className="text-gray-600">Add the category details below</p>
            </div>

            {/* Category Name Input */}
            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Catagory Name</label>
              <input
                type="text"
                placeholder="Enter Name here"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {cities.map((city, index) => (
                <div key={city.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-medium">
                      Sub Categories {String(index + 1).padStart(2, "0")}
                    </label>
                    <button
                      onClick={() => handleClearCity(city.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <RxCross2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    placeholder={`Features ${String(index + 1).padStart(
                      2,
                      "0"
                    )}`}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center my-4 text-white">
              <div className="flex justify-center items-center text-center">
                <button
                  onClick={handleAddCity}
                  className="rounded-full bg-green-600  text-white p-2"
                >
                  <GoPlus className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleCancel3}
                className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCancel3}
                className="py-2 px-4 rounded-lg bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CategoryManagement;
