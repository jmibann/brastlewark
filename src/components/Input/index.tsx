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
      className="rounded px-2 py-1"
      placeholder={`Search by ${placeholder}...`}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
};

export default Input;