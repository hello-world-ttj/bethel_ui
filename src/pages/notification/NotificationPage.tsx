import { useEffect, useState } from "react";
import NotificationTable from "../../components/Tables/NotificationTable";
import SelectMultiUser from "../../components/Forms/SelectGroup/SelectMultiUser";
import SelectNotificationType from "../../components/Forms/SelectGroup/SelectNotificationType";

import { createNotification } from "../../api/notificationApi";
import { toast } from "react-toastify";
import { upload } from "../../api/churchApi";

const NotificationPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [notificationType, setNotificationType] = useState<string>("email");
  const [emailData, setEmailData] = useState({
    content: "",
    subject: "",
    users: [] as string[],
    media: "",
    type: "email",
  });
  const baseUrl = `${import.meta.env.VITE_APP_IMAGE_URL}images`;

  useEffect(() => {
    setEmailData((prev) => ({
      ...prev,
      users: selectedUsers,
      type: notificationType,
    }));
  }, [selectedUsers, notificationType]);

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
      setEmailData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTypeChange = (value: string) => {
    setNotificationType(value);
    if (value === "whatsapp") {
      setPreview(null);
      setFile(null);
      setEmailData((prev) => ({
        ...prev,
        media: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = emailData.media;

      if (notificationType !== "whatsapp" && preview && file) {
        const response = await upload(file);
        if (response?.data) {
          imageUrl = response.data;
        }
      }

      const emailDataWithImage = {
        ...emailData,
        media:
          notificationType !== "whatsapp" && imageUrl
            ? `${baseUrl}/${imageUrl}`
            : "",
      };
      if (notificationType === "whatsapp") {
        const response = await createNotification(emailDataWithImage);
        window.open(response?.data);
      } else {
        await createNotification(emailDataWithImage);
      }
      setSelectedUsers([]);
      setEmailData({
        content: "",
        subject: "",
        users: [],
        media: "",
        type: notificationType,
      });
      setPreview(null);
      setFile(null);
      setIsChange((prev) => !prev);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5 justify-between">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white ">
            Notification
          </h2>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-5">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="mb-4.5">
              <SelectNotificationType
                onTypeChange={handleTypeChange}
                selectedType={notificationType}
              />
            </div>
            <div className="w-full">
              <SelectMultiUser
                onUserChange={(values) => setSelectedUsers(values)}
                selectedUsers={selectedUsers}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Content
              </label>
              <textarea
                rows={6}
                name="content"
                value={emailData.content}
                onChange={handleChange}
                placeholder="Enter Content"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              ></textarea>
            </div>

            {/* Only show media input if notification type is not WhatsApp */}
            {notificationType !== "whatsapp" && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Media
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
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
      <NotificationTable isChange={isChange} />
    </>
  );
};

export default NotificationPage;
