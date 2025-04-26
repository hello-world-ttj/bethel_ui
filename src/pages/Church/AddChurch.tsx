import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createChurch, getChurchById, updateChurch, upload } from "../../api/churchApi";
import { toast } from "react-toastify";

const AddChurch = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [churchData, setChurchData] = useState({
    name: "",
    image: "",
    address: "",
  });
  const baseUrl = `${import.meta.env.VITE_APP_IMAGE_URL}images`;
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
          setPreview(church.image? `${baseUrl}/${church.image}` : null);
        }
      };
      fetchChurch();
    }
  }, [isEditMode, churchId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);

      setFile(selectedFile);
    } else {
      setChurchData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = churchData.image;

      if (preview && file) {
        const response = await upload(file);
        if (response?.data) {
          imageUrl = response.data;
        }
      }
      const churchDataWithImage = {
        ...churchData,
        image: imageUrl,
      };
      if (isEditMode && churchId) {
        await updateChurch(churchId, churchDataWithImage);
      } else {
        await createChurch(churchDataWithImage);
      }
      navigate("/church");
    } catch (error: any) {
      toast.error(error.message);
    }
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
          onClick={() => navigate(-1)} // Replace with your back navigation logic
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Image
              </label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Selected Preview"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
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
