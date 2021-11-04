import React from "react";

type SelectProps = {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  return (
    <select placeholder="jobs" className="rounded px-2 py-1" onChange={onChange}>
      <option selected disabled>Select a profession</option>
      <option value='all'>All</option>
      {
        options?.map(profession => <option key={profession} value={profession}>{profession}</option>)
      }
    </select>
  )
};

export default Select;