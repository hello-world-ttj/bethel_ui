import { useEffect, useState } from "react";
import { Notification } from "../../types/notification";
import { getNotification } from "../../api/notificationApi";
import { useRefetch } from "../../context/RefetchContext";
interface NotificationTableProps {
  isChange: boolean;
}
const NotificationTable: React.FC<NotificationTableProps> = ({ isChange }) => {
  const [packageData, setPackageData] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { refetchTrigger } = useRefetch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const fetchNotifications = async () => {
    try {
      const response = await getNotification({
        page: currentPage,
        limit: itemsPerPage,
      });
      setTotalCount(response.totalCount);
      if (response?.data) {
        setPackageData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [currentPage, itemsPerPage, isChange, refetchTrigger]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Notification Logs
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className={`w-full table-auto `}>
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Users
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Subject
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Content
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.length > 0 ? (
              packageData.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem?.users
                        ?.map((user) => user.name)
                        .join(", ") || "—"}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.subject}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.content}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-3 text-gray-400"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <p className="text-lg font-medium">No data available</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={`mt-4 flex justify-between items-center`}>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1 border rounded text-gray-700 dark:bg-transparent"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {totalPages > 0 && (
            <div className="flex items-center justify-center px-4 py-2 bg-white dark:bg-graydark">
              <span className="text-gray-600 font-medium">Page</span>
              <span className="mx-1 px-2 py-1 bg-orange-50 rounded text-orange-600 font-bold dark:bg-graydark">
                {currentPage}
              </span>
              <span className="text-gray-600 font-medium">of {totalPages}</span>
            </div>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={totalPages === 0 || currentPage === totalPages}
            className={`px-3 py-2 rounded ${
              totalPages === 0 || currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-orange-500 text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
