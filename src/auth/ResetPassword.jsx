import { useState, useEffect } from "react";
import "antd/dist/reset.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";
import { useResetPasswordMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Get email from URL parameters
    const emailFromUrl = searchParams.get('email');
    if (emailFromUrl) {
      setFormData(prev => ({ ...prev, email: emailFromUrl }));
    }
  }, [searchParams]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      const result = await resetPassword({
        email: formData.email,
        code: formData.code,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }).unwrap();
      
      // Handle success response
      if (result.success) {
        // Show success toast
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful!",
          text: result.message,
          timer: 3000,
          showConfirmButton: false,
        });
        
        // Navigate to login page
        navigate("/login");
      }
    } catch (err) {
      // Handle error response
      const errorMessage = err?.data?.message || "Failed to reset password. Please try again.";
      setError(errorMessage);
      
      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: errorMessage,
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
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter verification code"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
              required
            />
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
                  <IoEyeOffOutline className="w-5 h-5 [text-[#FF62BD]" />
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
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 text-[#FF62BD]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF62BD]" />
                )}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
              {error}
            </div>
          )}

          <div className="flex justify-center items-center text-[#000000]">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-6 rounded-lg shadow-lg mt-5 transition-colors ${
                isLoading 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-[#B5ED90] hover:bg-[#A5DD80] cursor-pointer"
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
