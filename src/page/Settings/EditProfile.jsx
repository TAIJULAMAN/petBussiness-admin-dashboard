import { useState, useEffect } from "react";
import {
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/api/profileApi";
import { message, Spin } from "antd";
import Swal from "sweetalert2";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { data: profileData, isLoading: profileLoading } =
    useGetAdminProfileQuery();
  console.log("profileData from edit profile", profileData);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Populate form with profile data
  useEffect(() => {
    if (profileData?.admin) {
      const profile = profileData?.admin;
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      await updateProfile(formDataToSend).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err?.data?.message || "Failed to update profile",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
      <p className="text-[#0D0D0D] text-center font-bold text-2xl mb-5">
        Edit Your Profile
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl focus:border-[#FF62BD]"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl bg-gray-100"
            placeholder="Email address"
            readOnly
          />
        </div>

        <div className="text-center py-5">
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
              isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#91DF92] hover:bg-[#7BC97C]"
            }`}
          >
            {isUpdating ? "Updating..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
