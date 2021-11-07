import React from "react";

type SelectProps = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, value }) => {
  return (
    <select
      placeholder="jobs"
      className="rounded px-2 py-1 border w-1/2 sm:w-1/4"
      onChange={onChange}
      value={value}
    >
      <option value='initialValue' disabled>Select a profession</option>
      <option value='all'>All</option>
      {
        options?.map(profession => <option key={profession} value={profession}>{profession}</option>)
      }
    </select>
  )
};

export default Select;