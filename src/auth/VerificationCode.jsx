import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";

function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  // const [VerifyCode] = useVerifyCodeMutation();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      prev?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = digits[i] || "";
    }
    setCode(newCode);
    const nextIndex = Math.min(digits.length, 5);
    document.getElementById(`code-${nextIndex}`)?.focus();
  };

  const handleVerifyCode = async () => {
    const email = new URLSearchParams(location.search).get("email") || "";
    const joined = code.join("");
    if (joined.length !== 6) return;
    navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(joined)}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <BrandLogo
          status=" Check your email"
          information=" Please enter your email to get verification code."
        />
        <form className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#FF62BD] text-[#FF62BD] rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center text-[#000000]">
            <button
              onClick={handleVerifyCode}
              type="button"
              className="whitespace-nowrap w-full bg-[#B5ED90] text-[#000000] font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
