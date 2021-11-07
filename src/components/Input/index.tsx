import React from 'react';

type InputType = {
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputType> = ({ name, value, placeholder, onChange, onKeyDown }) => {
  return (
    <input
      name={name}
      value={value}
      className="rounded w-1/2 sm:w-1/4 px-2 py-1 border mb-2 sm:mb-0"
      placeholder={`Search by ${placeholder}...`}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
};

export default Input;