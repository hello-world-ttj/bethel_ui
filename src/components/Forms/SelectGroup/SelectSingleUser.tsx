import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getMember } from "../../../api/userApi";
import { User } from "../../../types/user";

interface SelectSingleUserProps {
  onUserChange: (value: string | null) => void;
  selectedUser: string | null;
}

const SelectSingleUser: React.FC<SelectSingleUserProps> = ({
  onUserChange,
  selectedUser = null,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<
    { label: string; value: string } | null
  >(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getMember({
        user: "all",
        status: "inactive",
      });
      const userOptions = response.data.map((user: User) => ({
        label: user.name,
        value: user._id,
      }));
      setOptions(userOptions);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const selected = options.find((option) => option.value === selectedUser);
    setSelectedOption(selected || null);
  }, [selectedUser, options]);

  const handleChange = (selected: any) => {
    const value = selected ? selected.value : null;
    onUserChange(value);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">User</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a User"
        classNamePrefix="react-select"
        isClearable
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: "#d1d5db",
            padding: "2px",
            minHeight: "48px",
            backgroundColor: "transparent",
          }),
          menu: (provided, state) => ({
            ...provided,
            zIndex: 50,
            backgroundColor: document.body.classList.contains("dark")
              ? "#1e293b"
              : provided.backgroundColor,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
              ? document.body.classList.contains("dark")
                ? "#334155"
                : provided.backgroundColor
              : document.body.classList.contains("dark")
              ? "#1e293b"
              : provided.backgroundColor,
            color: document.body.classList.contains("dark")
              ? "#fff"
              : provided.color,
          }),
          input: (provided) => ({
            ...provided,
            color: document.body.classList.contains("dark")
              ? "#fff"
              : provided.color,
          }),
          singleValue: (provided) => ({
            ...provided,
            color: document.body.classList.contains("dark")
              ? "#fff"
              : provided.color,
          }),
        }}
      />
    </div>
  );
};

export default SelectSingleUser;