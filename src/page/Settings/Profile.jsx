import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import PageHeading from "../../shared/PageHeading";
import {
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/profileApi";
import { Spin } from "antd";
import Swal from "sweetalert2";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { data: profileData, isLoading, refetch } = useGetAdminProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Invalid File",
          text: "Please select an image file",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
      uploadProfilePicture(file);
    }
  };
  const uploadProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      console.log("Uploading file:", file);
      console.log("FormData entries:", [...formData.entries()]);

      const result = await updateProfile(formData).unwrap();
      console.log("Upload result:", result);

      // Refetch profile data to get updated image
      await refetch();
      console.log("Profile data refetched");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile picture updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear preview after successful upload
      setPreviewImage(null);
      setSelectedImage(null);
    } catch (err) {
      console.error("Upload error:", err);
      console.error("Error details:", err?.data);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err?.data?.message || "Failed to update profile picture",
        timer: 3000,
        showConfirmButton: false,
      });

      // Clear preview on error
      setPreviewImage(null);
      setSelectedImage(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <PageHeading title=" Admin Profile" />
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col justify-center items-center mt-5 text-gray-800 w-[900px] mx-auto p-5 gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center relative overflow-hidden">
                <img
                  src={
                    previewImage ||
                    profileData?.admin?.profilePic ||
                    "https://avatar.iran.liara.run/public/44"
                  }
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    console.log("Image load error:", e.target.src);
                    e.target.src = "https://avatar.iran.liara.run/public/44";
                  }}
                />
                {/* Upload Icon with loading state */}
                <div
                  className={`absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer transition-opacity ${
                    isUpdating
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <label
                    htmlFor="profilePicUpload"
                    className={`cursor-pointer ${
                      isUpdating ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {isUpdating ? (
                      <div className="w-4 h-4 border-2 border-[#FF62BD] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FaCamera className="text-[#FF62BD]" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                    disabled={isUpdating}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="flex-1 text-xl md:text-3xl font-bold">
                {profileData?.admin?.name || "Admin"}
              </p>
              <p className="text-gray-600 text-center mt-2">
                {profileData?.admin?.role || ""}
              </p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#FF62BD] border-b-2 border-[#FF62BD]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#FF62BD] border-b-2 border-[#FF62BD]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
