import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import Swal from "sweetalert2";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    try {
      const result = await forgotPassword({ email }).unwrap();
      
      // Handle success response
      if (result.success) {
        // Show success toast
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: result.message,
          timer: 3000,
          showConfirmButton: false,
        });
        
        // Navigate to verify email page
        navigate(`/reset-password?email=${email}`);
      }
    } catch (err) {
      // Handle error response
      const errorMessage = err?.data?.message || "Failed to send reset email. Please try again.";
      setError(errorMessage);
      
      // Show error toast
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: errorMessage,
        confirmButtonColor: "#FF62BD",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-5 py-20 w-full max-w-xl text-center">
        <BrandLogo
          status=" Forgot password?"
          information=" Please enter your email to get verification code."
        />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
              required
            />
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
              className={`whitespace-nowrap w-full font-semibold py-3 rounded-lg shadow-lg mt-5 transition-colors ${
                isLoading 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-[#B5ED90] hover:bg-[#A5DD80] cursor-pointer"
              }`}
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
