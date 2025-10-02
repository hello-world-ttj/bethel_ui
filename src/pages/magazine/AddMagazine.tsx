import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadS3 } from "../../api/churchApi";
import { toast } from "react-toastify";
import { createMagazine } from "../../api/magazineApi";

const AddMagazine = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setformData] = useState({
    name: "",
    pdf: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      const pdfUrl = URL.createObjectURL(selectedFile);
      setPreview(pdfUrl);

      setFile(selectedFile);
    } else {
      setformData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let pdfUrl = formData.pdf;

      if (preview && file) {
        const response = await uploadS3(file);
        if (response?.data) {
          pdfUrl = response.data;
        }
      }
      const formDataWithpdf = {
        ...formData,
        pdfUrl: pdfUrl,
      };
      await createMagazine(formDataWithpdf);

      navigate("/magazine");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
          Add Magazine
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
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Pdf
              </label>
              <input
                type="file"
                name="file"
                accept="application/pdf*"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMagazine;
