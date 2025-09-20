import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangeAdminPasswordMutation } from "../../redux/api/profileApi";
import Swal from "sweetalert2";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [changeAdminPassword, { isLoading }] = useChangeAdminPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");

    if (form.newPassword !== form.confirmNewPassword) {
      setErrorMsg("New password and confirmation do not match.");
      return;
    }

    try {
      await changeAdminPassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      }).unwrap();
      // Show success modal
      Swal.fire({
        title: "Password Changed",
        text: "Your password has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#91DF92",
      });
      setMessage("Password changed successfully.");
      setForm({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      const apiMsg = err?.data?.message || err?.error || "Failed to change password.";
      setErrorMsg(apiMsg);
    }
  };

  return (
    <div className="bg-white px-20 w-[715px] pt-10 py-5 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">
        Change Password
      </p>
    
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <label
            htmlFor="oldPassword"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="newPassword"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="confirmNewPassword"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-center py-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#91DF92] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold w-full py-3 rounded-md"
          >
            {isLoading ? "Saving..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
