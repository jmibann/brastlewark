import React from 'react';

type AvatarCellProps = {
  value: string;
  column: Record<string, string>;
  row: Record<string, Record<string, string>>;
}

const AvatarCell: React.FC<AvatarCellProps> = ({ value, column, row }) => (
  <div className="flex items-center self-start ml-4">
    <div className="flex-shrink-0 h-12 w-12">
      <img className="h-12 w-12 rounded-full" src={row.original[column.imgAccessor]} alt="" />
    </div>
    <div className="ml-4">
      <div className="text-sm font-medium text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{row.original[column.ageAccessor]}</div>
    </div>
  </div>
);

export default AvatarCell;