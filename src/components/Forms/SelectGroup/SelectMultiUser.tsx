import React, { useEffect, useState, useRef } from "react";
import { getMember } from "../../../api/userApi";
import { User } from "../../../types/user";

interface SelectGroupOneProps {
  onUserChange: (values: string[]) => void;
  selectedUsers: string[];
}

const SelectMultiUser: React.FC<SelectGroupOneProps> = ({ onUserChange, selectedUsers = [] }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getMember({
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserToggle = (userId: string) => {
    let updatedSelection;
    
    if (selectedUsers.includes(userId)) {
      updatedSelection = selectedUsers.filter(id => id !== userId);
    } else {
      updatedSelection = [...selectedUsers, userId];
    }
    
    onUserChange(updatedSelection);
  };

  const getSelectedUserNames = () => {
    if (selectedUsers.length === 0) return "Select your Users";
    
    const selectedNames = selectedUsers
      .map(id => users.find(user => user._id === id)?.name || "")
      .filter(name => name !== "");
    
    return selectedNames.length > 2 
      ? `${selectedNames.slice(0, 2).join(", ")} +${selectedNames.length - 2} more`
      : selectedNames.join(", ");
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUserChange([]);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Users</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input" ref={dropdownRef}>
        <div
          onClick={handleToggleDropdown}
          className={`relative z-20 flex items-center justify-between w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-[#f09443] active:border-[#f09443] cursor-pointer dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#f09443] ${
            selectedUsers.length > 0 ? "text-black dark:text-white" : "text-body dark:text-bodydark"
          }`}
        >
          <span className="truncate">{getSelectedUserNames()}</span>
          <div className="flex items-center">
            {selectedUsers.length > 0 && (
              <button
                onClick={clearAll}
                className="mr-2 text-sm text-body hover:text-danger dark:text-bodydark"
              >
                Clear
              </button>
            )}
            <span>
              <svg
                className={`fill-current transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 z-30 mt-2 rounded-lg border border-stroke bg-white py-3 shadow-lg dark:border-form-strokedark dark:bg-form-input">
            {users.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleUserToggle(user._id)}
                    className="flex items-center px-5 py-2 cursor-pointer hover:bg-whiter dark:hover:bg-meta-4"
                  >
                    <div className="mr-3">
                      <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                        selectedUsers.includes(user._id)
                          ? "border-[#f09443] bg-[#f09443]"
                          : "border-stroke dark:border-strokedark"
                      }`}>
                        {selectedUsers.includes(user._id) && (
                          <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972Z" fill="white" stroke="white" strokeWidth="0.4"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {user.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-4 text-sm text-body dark:text-bodydark">
                No users available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectMultiUser;