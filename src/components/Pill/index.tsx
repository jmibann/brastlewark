import React from 'react';

type PillProps = {
  value: string;
}

const Pill: React.FC<PillProps> = ({ value }) => (
  <span
    className="m-1 px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-green-100 text-green-800"
  >
    {value}
  </span >
);

export default Pill;