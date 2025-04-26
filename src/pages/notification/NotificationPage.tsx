import { useEffect, useState } from "react";
import NotificationTable from "../../components/Tables/NotificationTable";
import SelectMultiUser from "../../components/Forms/SelectGroup/SelectMultiUser";
import { toast } from "react-toastify";

const NotificationPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [emailData, setEmailData] = useState({
    content: "",
    subject: "",
    users: [] as string[],
  });
  useEffect(() => {
    setEmailData((prev) => ({
      ...prev,
      users: selectedUsers,
    }));
  }, [selectedUsers]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailData);
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
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <SelectMultiUser
                  onUserChange={(values) => setSelectedUsers(values)}
                  selectedUsers={selectedUsers}
                />
              </div>
            </div>
            <div className="mb-4.5">
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
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <NotificationTable />
    </>
  );
};

export default NotificationPage;
