import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BrandLogo from "../shared/BrandLogo";
import { useForgotPasswordMutation } from "../redux/api/authApi";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Email sent",
        text: res?.message || "We have sent a verification code to your email.",
        timer: 2000,
        showConfirmButton: false,
      });
      // Navigate with email in query for future resend
      navigate(`/verify-mail?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const msg = err?.data?.message || "Failed to send reset email. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: msg,
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
              placeholder="admin@gmail.com"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF62BD] rounded-md outline-none mt-5 placeholder:text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center items-center text-[#000000]">
            <button
              type="submit"
              disabled={isLoading}
              className={`whitespace-nowrap w-full ${
                isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#B5ED90]"
              } text-[#000000] font-semibold py-3 rounded-lg shadow-lg cursor-pointer mt-5`}
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
