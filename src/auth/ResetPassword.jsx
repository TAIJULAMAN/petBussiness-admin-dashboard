import { useState } from "react";
import "antd/dist/reset.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BrandLogo from "../shared/BrandLogo";
import { useResetPasswordMutation } from "../redux/api/authApi";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const email = params.get("email") || "";
    const code = params.get("code") || "";

    if (!email || !code) {
      Swal.fire({
        icon: "error",
        title: "Missing data",
        text: "Email or verification code is missing. Please restart the flow.",
        confirmButtonColor: "#FF62BD",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak password",
        text: "Password should be at least 6 characters.",
        confirmButtonColor: "#FF62BD",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
        confirmButtonColor: "#FF62BD",
      });
      return;
    }

    try {
      const res = await resetPassword({ email, code, password, confirmPassword }).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Password updated",
        text: res?.message || "Your password has been reset successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (err) {
      const msg = err?.data?.message || "Failed to reset password. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Reset failed",
        text: msg,
        confirmButtonColor: "#FF62BD",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ebfcf4] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          status="Set a new password"
          information="Create a new password. Ensure it differs from previous ones for security."
        />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-[#FF62BD]"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 text-[#FF62BD]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF62BD]" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-[#FF62BD]"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 text-[#FF62BD]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF62BD]" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center text-[#000000]">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5 ${
                isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-[#B5ED90]"
              }`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
