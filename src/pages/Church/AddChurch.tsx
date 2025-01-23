import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createChurch, getChurchById, updateChurch } from "../../api/churchApi";

const AddChurch = () => {
  const [churchData, setChurchData] = useState({
    name: "",
    image: "data:image/png;base64,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",
    address: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const churchId = state?.id;

  useEffect(() => {
    if (isEditMode && churchId) {
      const fetchChurch = async () => {
        const response = await getChurchById(churchId);
        const church = response.data;

        if (church) {
          setChurchData({
            name: church.name || "",
            image: church.image || "",
            address: church.address || "",
          });
        }
      };
      fetchChurch();
    }
  }, [isEditMode, churchId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChurchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && churchId) {
        await updateChurch(churchId, churchData);
      } else {
        await createChurch(churchData);
      }
      navigate("/church");
    } catch (error) {
      console.error("Failed to save church", error);
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black">
          {churchId ? "Edit Church" : "Add Church"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={churchData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Address
              </label>
              <textarea
                rows={6}
                name="address"
                value={churchData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {churchId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChurch;
