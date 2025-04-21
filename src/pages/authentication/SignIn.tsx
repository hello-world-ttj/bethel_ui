import React, { useState } from "react";
import LogoDark from "../../images/bethel.png";
import Logo from "../../images/bethel.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response?.data) {
        localStorage.setItem("423455ehlsls", response.data);
        navigate("/dashboard");
      } else {
        toast.error("Invalid login credentials");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center bg-white h-screen">
        <div className="w-full  xl:w-1/2  border border-stroke bg-white dark:border-strokedark dark:bg-boxdark shadow-lg ">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <div className="mb-3.5 flex justify-center">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img
                className="dark:hidden w-26 h-28"
                src={LogoDark}
                alt="Logo"
              />
            </div>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 flex justify-center ">
              Login to Bethal Patrika
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        fill=""
                      />
                      <path
                        d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20V21H4V20Z"
                        fill=""
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-12 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                  >
                    {showPassword ? (
                      <AiOutlineEye size={22} />
                    ) : (
                      <AiOutlineEyeInvisible size={22} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-90"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
