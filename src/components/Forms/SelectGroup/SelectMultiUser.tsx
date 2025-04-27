import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getMember } from "../../../api/userApi";
import { User } from "../../../types/user";

interface SelectGroupOneProps {
  onUserChange: (values: string[]) => void;
  selectedUsers: string[];
}

const SelectMultiUser: React.FC<SelectGroupOneProps> = ({
  onUserChange,
  selectedUsers = [],
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedOptions, setSelectedOptions] = useState<
    { label: string; value: string }[]
  >([]);

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
    const selected = options.filter((option) =>
      selectedUsers.includes(option.value)
    );
    setSelectedOptions(selected);
  }, [selectedUsers, options]);

  const handleChange = (selected: any) => {
    const values = selected ? selected.map((item: any) => item.value) : [];
    onUserChange(values);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Users</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Select your Users"
        classNamePrefix="react-select"
        isClearable
        closeMenuOnSelect={false}
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
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: document.body.classList.contains("dark")
              ? "#334155"
              : provided.backgroundColor,
          }),
          multiValueLabel: (provided) => ({
            ...provided,
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

export default SelectMultiUser;
