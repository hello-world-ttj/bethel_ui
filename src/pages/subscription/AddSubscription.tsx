import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectUser from "../../components/Forms/SelectGroup/SelectUser";
import {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../../api/subscriptionApi";
import SelectPlan from "../../components/Forms/SelectGroup/SelectPlan";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { toast } from "react-toastify";
import SelectSingleUser from "../../components/Forms/SelectGroup/SelectSingleUser";

const AddSubscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [isChurchBased, setIsChurchBased] = useState(true);
  const isEditMode = state?.editMode;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedChurch, setSelectedChurch] = useState("");
  const [subData, setSubData] = useState(() => ({
    receipt: "",
    user: "",
    plan: "",
    ...(isEditMode && { expiryDate: "" }),
  }));

  const subId = state?.id;

  useEffect(() => {
    if (isEditMode && subId) {
      const fetchSub = async () => {
        const response = await getSubscriptionById(subId);
        const sub = response.data;

        if (sub) {
          const formattedDate = sub.expiryDate
            ? new Date(sub.expiryDate).toISOString().split("T")[0]
            : "";
          setSubData((prev: any) => ({
            ...prev,
            ...(isEditMode && { expiryDate: formattedDate || "" }),
            receipt: sub.receipt || "",
            expiryDate: formattedDate || "",
            user: sub.user._id || "",
            plan: sub.plan._id || "",
          }));
          setSelectedChurch(sub.user.church);
          setIsChurchBased(!!sub.user.church);
        }
      };
      fetchSub();
    }
  }, [isEditMode, subId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...subData,
        user: isChurchBased ? subData.user : selectedUsers[0],
      };

      if (isEditMode && subId) {
        await updateSubscription(subId, payload);
      } else {
        await createSubscription(payload);
      }

      navigate("/subscription");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUserChange = (value: string) => {
    setSubData((prev: any) => ({
      ...prev,
      user: value,
    }));
  };

  const handlePlanChange = (value: string) => {
    setSubData((prev: any) => ({
      ...prev,
      plan: value,
    }));
  };
  const handleChurchChange = (value: string) => {
    setSelectedChurch(value);
    setSubData((prev: any) => ({
      ...prev,
      user: "",
    }));
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-self-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-black dark:text-white hover:text-blue-600"
          onClick={() => navigate(-1)} // Replace with your back navigation logic
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {subId ? "Edit Subscription" : "Add Subscription"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* Styled Church-Based Switcher (same as DarkModeSwitcher) */}
            <div className="mb-4.5 flex items-center gap-4">
              <label className="text-black dark:text-white font-medium">
                Church Based
              </label>
              <label
                className={`relative m-0 block h-7.5 w-14 rounded-full ${
                  isChurchBased ? "bg-primary" : "bg-stroke"
                }`}
              >
                <input
                  type="checkbox"
                  onChange={() => {
                    setIsChurchBased(!isChurchBased);
                    setSelectedChurch("");
                    setSubData((prev: any) => ({ ...prev, user: "" }));
                  }}
                  checked={isChurchBased}
                  className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
                    isChurchBased && "!right-[3px] !translate-x-full"
                  }`}
                >
                  <span className="dark:hidden">
                    {/* Light Icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8" cy="8" r="5" fill="#969AA1" />
                    </svg>
                  </span>
                  <span className="hidden dark:inline-block">
                    {/* Dark Icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z"
                        fill="#969AA1"
                      />
                    </svg>
                  </span>
                </span>
              </label>
            </div>

            {isChurchBased ? (
              <>
                <SelectGroupOne
                  onChurchChange={handleChurchChange}
                  selectedChurch={selectedChurch}
                />
                <SelectUser
                  onUserChange={handleUserChange}
                  selectedUser={subData.user}
                  selectedChurch={selectedChurch}
                />
              </>
            ) : (
              <SelectSingleUser
                onUserChange={(values) => setSelectedUsers([values as string])}
                selectedUser={selectedUsers[0]}
              />
            )}

            {isEditMode && (
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Expiry Date <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={subData.expiryDate}
                  onChange={handleChange}
                  disabled
                  placeholder="Enter expiry date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
            )}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Receipt Number
              </label>
              <input
                type="text"
                name="receipt"
                value={subData.receipt}
                onChange={handleChange}
                placeholder="Enter receipt number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <SelectPlan
              onPlanChange={handlePlanChange}
              selectedPlan={subData.plan}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {subId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
