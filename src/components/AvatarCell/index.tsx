import React from 'react';

type AvatarCellProps = {
  value: string;
  column: Record<string, string>;
  row: Record<string, Record<string, string>>;
}

const AvatarCell: React.FC<AvatarCellProps> = ({ value, column, row }) => (
  <div className="flex flex-col justify-center items-center sm:ml-4 sm:flex-row sm:self-start ">
    <div className="flex flex-shrink-0 h-12 w-12">
      <img className="h-12 w-12 rounded-full" src={row.original[column.imgAccessor]} alt="" />
    </div>
    <div className="flex flex-col justify-center sm:ml-4 sm:justify-start sm:items-start">
      <div className="text-sm font-medium text-gray-900 text-center sm:text-start">{value}</div>
    </div>
  </div>
);

export default AvatarCell;