import { useState, useEffect } from "react";
import DropdownUser from "./DropdownUser";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { clearCache } from "../../api/userApi";
import { useRefetch } from "../../context/RefetchContext";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Never");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { triggerRefetch } = useRefetch();

  useEffect(() => {
    const storedTime = localStorage.getItem("lastSyncedTime");
    if (storedTime) {
      setLastSyncedTime(storedTime);
    }
  }, []);

  const handleRefresh = async () => {
    setIsSyncing(true);
    try {
      await clearCache();
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; 
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
      setLastSyncedTime(formattedTime);
      localStorage.setItem("lastSyncedTime", formattedTime);
      triggerRefetch();
    } catch (error) {
      console.error("Error syncing data:", error);
    } finally {
      setIsSyncing(false);
    }
  };
  

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-400">Last synced:</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lastSyncedTime}</span>
          </div>
          
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <button
                onClick={handleRefresh}
                disabled={isSyncing}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke bg-gray hover:bg-gray-100 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-gray-700"
                title="Sync data"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </li>
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;