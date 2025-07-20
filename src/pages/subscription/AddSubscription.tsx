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
import SelectSubscriptionSingleUser from "../../components/Forms/SelectGroup/SelectSubscriptionUser";

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

          const isUserChurchBased = !!sub.user.church;

          setSubData((prev: any) => ({
            ...prev,
            ...(isEditMode && { expiryDate: formattedDate || "" }),
            receipt: sub.receipt || "",
            expiryDate: formattedDate || "",
            user: sub.user._id || "",
            plan: sub.plan._id || "",
          }));

          setIsChurchBased(isUserChurchBased);

          if (isUserChurchBased) {
            setSelectedChurch(sub.user.church);
          } else {
            setSelectedUsers([sub.user._id]);
          }
        }
      };

      fetchSub();
    }
  }, [isEditMode, subId]);
  useEffect(() => {
    if (!isChurchBased) {
      if (subData.user) {
        setSelectedUsers([subData.user]);
      } else {
        setSelectedUsers([]);
      }
    }
  }, [isChurchBased, subData.user]);

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
                    <svg
                      className="fill-primary dark:fill-white"
                      width="20"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C11.45 2 11 2.45 11 3V6.55L9.05 8.05C8.74 8.28 8.57 8.64 8.57 9.01V10H7C6.45 10 6 10.45 6 11V12C6 12.55 6.45 13 7 13H8.57V20H5C4.45 20 4 20.45 4 21V22H20V21C20 20.45 19.55 20 19 20H15.43V13H17C17.55 13 18 12.55 18 12V11C18 10.45 17.55 10 17 10H15.43V9.01C15.43 8.64 15.26 8.28 14.95 8.05L13 6.55V3C13 2.45 12.55 2 12 2ZM10 20V13H14V20H10Z"
                        fill=""
                      />
                    </svg>
                  </span>
                  <span className="hidden dark:inline-block">
                    <svg
                      className="fill-primary dark:fill-white"
                      width="20"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C11.45 2 11 2.45 11 3V6.55L9.05 8.05C8.74 8.28 8.57 8.64 8.57 9.01V10H7C6.45 10 6 10.45 6 11V12C6 12.55 6.45 13 7 13H8.57V20H5C4.45 20 4 20.45 4 21V22H20V21C20 20.45 19.55 20 19 20H15.43V13H17C17.55 13 18 12.55 18 12V11C18 10.45 17.55 10 17 10H15.43V9.01C15.43 8.64 15.26 8.28 14.95 8.05L13 6.55V3C13 2.45 12.55 2 12 2ZM10 20V13H14V20H10Z"
                        fill=""
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
              <SelectSubscriptionSingleUser
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
                  // disabled
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
