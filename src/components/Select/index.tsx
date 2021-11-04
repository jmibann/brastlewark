import React from "react";

type SelectProps = {
  options: string[];
}

const Select: React.FC<SelectProps> = ({ options }) => {
  return (
    <select placeholder="jobs" className="rounded px-2 py-1">
      <option selected disabled>Select a profession</option>
      <option value='all'>All</option>
      {
        options?.map(profession => <option value={profession}>{profession}</option>)
      }
    </select>
  )
};

export default Select;