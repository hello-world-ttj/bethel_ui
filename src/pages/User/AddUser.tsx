import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../api/userApi";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { toast } from "react-toastify";
import SelectSalutation from "../../components/Forms/SelectGroup/SelectSalutation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const AddUser = () => {
  const [userData, setUserData] = useState({
    salutation: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    church: "",
    regNo: "",
    pincode: "",
    nativePlace: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const userId = state?.id;

  useEffect(() => {
    if (isEditMode && userId) {
      const fetchUser = async () => {
        const response = await getUserById(userId);
        const user = response.data;

        if (user) {
          setUserData({
            salutation: user.salutation || "",
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            church: user.church?._id || "",
            pincode: user.pincode || "",
            regNo: user.regNo || "",
            nativePlace: user.nativePlace || "",
          });
        }
      };
      fetchUser();
    }
  }, [isEditMode, userId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && userId) {
        await updateUser(userId, userData);
      } else {
        await createUser(userData);
      }
      navigate("/user");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleChurchChange = (value: string) => {
    setUserData((prev) => ({
      ...prev,
      church: value,
    }));
  };
  const handleSalutationChange = (value: string) => {
    setUserData((prev) => ({
      ...prev,
      salutation: value,
    }));
  };
  const handleMobileChange = (value: string) => {
    setUserData((prev) => ({
      ...prev,
      phone: value,
    }));
  };
 
  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-black dark:text-white hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {userId ? "Edit User" : "Add User"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <SelectSalutation
                  selectedSalutation={userData.salutation}
                  onSalutationChange={handleSalutationChange}
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Register No
                </label>
                <input
                  type="text"
                  name="regNo"
                  value={userData.regNo}
                  onChange={handleChange}
                  placeholder="Enter  register number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Phone
              </label>
              <PhoneInput
                  country={"in"}
                  value={userData.phone}
                  onChange={handleMobileChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    className:
                      "w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-[#0072bc] active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  }}
                  containerClass="phone-input-container"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                />
            </div>

            <SelectGroupOne
              onChurchChange={handleChurchChange}
              selectedChurch={userData.church}
            />

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Address <span className="text-meta-1">*</span>
              </label>
              <textarea
                rows={6}
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Native Place <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="nativePlace"
                value={userData.nativePlace}
                onChange={handleChange}
                placeholder="Enter native place"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Pin Code <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={userData.pincode}
                onChange={handleChange}
                placeholder="Enter pin code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {userId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
