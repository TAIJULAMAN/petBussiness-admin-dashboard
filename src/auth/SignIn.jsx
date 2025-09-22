import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slice/authSlice";
import Swal from "sweetalert2";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [logIn, { isLoading }] = useLogInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load saved credentials if 'Remember me' was previously selected
  useEffect(() => {
    try {
      const savedRemember = localStorage.getItem("rememberMe") === "true";
      const savedEmail = localStorage.getItem("rememberEmail") || "";
      const savedPassword = localStorage.getItem("rememberPassword") || "";
      if (savedRemember) {
        setIsChecked(true);
        setFormData({ email: savedEmail, password: savedPassword });
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (!checked) {
      try {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPassword");
      } catch {
        // ignore storage errors
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await logIn(formData).unwrap();
      console.log("response from sign in", response);
      if (response?.success && response?.accessToken) {
        // Dispatch user data to Redux store
        dispatch(
          setUser({
            user: response?.user,
            accessToken: response?.accessToken,
            refreshToken: response?.refreshToken,
          })
        );

        // Persist credentials based on 'Remember me'
        try {
          if (isChecked) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("rememberEmail", formData.email);
            localStorage.setItem("rememberPassword", formData.password);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("rememberEmail");
            localStorage.removeItem("rememberPassword");
          }
        } catch {
          // ignore storage errors
        }

        // Show success toast
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: response.message,
          timer: 2000,
          showConfirmButton: false,
        });

        // Navigate to dashboard
        navigate("/");
      }
    } catch (err) {
      // Handle error response
      const errorMessage =
        err?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);

      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B5ED90] via-[#A5DD80] to-[#95CD70] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-white rounded-full blur-xl"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#B5ED90] to-[#A5DD80] rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your pet business dashboard</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5ED90] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5ED90] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-[#B5ED90] bg-gray-100 border-gray-300 rounded focus:ring-[#B5ED90] focus:ring-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link 
                to="/forget-password" 
                className="text-sm text-[#B5ED90] hover:text-[#A5DD80] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#B5ED90] to-[#A5DD80] hover:from-[#A5DD80] hover:to-[#95CD70] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          
          </div>
        </div>
      </div>
    </div>
  );
}
