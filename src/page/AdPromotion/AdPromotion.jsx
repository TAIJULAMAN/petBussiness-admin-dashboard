/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import PageHeading from "../../shared/PageHeading";
import { Modal } from "antd";
import { FaUpload } from "react-icons/fa";
import { getImageUrl } from "../../config/envConfig";
import { useGetAllAdsQuery, useUpdateAdsStatusMutation } from "../../redux/api/adsPromotionApis";

export default function AdPromotion() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState("Electronics");

  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  // const showModal2 = () => {
  //   setAddModalOpen(true);
  // };
  const { data, isLoading, error, refetch } = useGetAllAdsQuery();
  const ads = Array.isArray(data?.advertisement) ? data.advertisement : [];
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // console.log(getImageUrl("uploads//1755234295506-246692174.jpg"));

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <div className="flex justify-between items-center text-center mb-5">
        <PageHeading title="Ads Promotion" />

        {/* <div className="flex justify-end items-center">
          <button
            onClick={showModal2}
            className="bg-[#FF62BD] text-white px-4 py-3 rounded-lg"
          >
            + Add New Promotion
          </button>
        </div> */}
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">
          {"status" in error ? `Error ${error.status}` : "Error"}
        </div>
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ads.map((ad) => (
            <AdCard key={ad._id} ad={ad} onChanged={refetch} />
          ))}
        </div>
      )}
      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Add New Category</h2>
            <p className="text-gray-600">
              Fill out the details below to add a new category. This will help
              users organize their listings effectively.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">
              Upload Category Image
            </label>
            <label className="border border-gray-300 rounded flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex items-center text-gray-500">
                <FaUpload className="w-5 h-5 mr-2 text-gray-400" />
                <span>
                  {selectedImage ? selectedImage.name : "Upload Picture"}
                </span>
              </div>
            </label>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="mt-2 max-h-40 object-contain rounded"
              />
            )}
          </div>

          {/* Category Name Input */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">
              Advertisement Name
            </label>
            <input
              type="text"
              placeholder="Enter Name here"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          {/* start date and end date */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="block text-gray-800 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-800 mb-2">End Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
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
    </div>
  );
}

function AdCard({ ad, onChanged }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updateAdsStatus, { isLoading: isUpdating }] = useUpdateAdsStatusMutation();

  const toggleStatus = async () => {
    const current = (ad?.status || "INACTIVE").toUpperCase();
    const next = current === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await updateAdsStatus({ id: ad._id, status: next }).unwrap();
      onChanged?.();
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setIsMenuOpen(false);
    }
  };
  return (
    <div className="bg-[#FF62BD] rounded-lg overflow-hidden shadow-md">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg">Advertisement</h2>
            <span className={`px-2 py-0.5 rounded text-xs ${ad.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
              {ad.status}
            </span>
          </div>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <FiMoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-10">
                <button
                  onClick={toggleStatus}
                  disabled={isUpdating}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Change Status to {ad.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}
                </button>
              </div>
            )}
          </div>
        </div>

        <img
          src={getImageUrl((ad?.advertisementImg?.[0] || "").replace(/\\/g, "/"))}
          alt={"Advertisement"}
          className="w-full rounded-lg max-h-[300px] object-cover"
        />
      </div>

      <div className="grid grid-cols-2 text-center p-5 mt-5">
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-start text-start">
            Start day
          </span>
          <span className="text-lg text-gray-800 flex justify-start text-start">
            {new Date(ad?.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-end text-end">
            End day
          </span>
          <span className="text-lg text-gray-800 flex justify-end text-end">
            {new Date(ad?.updatedAt || ad?.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* Only status change per 3-dot menu; edit/delete modals removed per requirement */}
    </div>
  );
}
