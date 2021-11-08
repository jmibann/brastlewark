import React from 'react';

type AvatarCellProps = {
  value: undefined | string;
  column: undefined | Record<string, string>;
  row: undefined | Record<string, Record<string, string>>;
  isLoading?: boolean;
};

const AvatarCell: React.FC<AvatarCellProps> = ({ value, column, row, isLoading = false }) => {
  const imgSrc = row.original[column.imgAccessor];

  const avatar = isLoading
    ? <div className="animate-pulse w-12 h-12 bg-gray-300 rounded-full " />
    : <img className="h-12 w-12 rounded-full" src={imgSrc} alt="" />

  const nameLine = isLoading
    ? <div className="animate-pulse w-28 bg-gray-300 h-4 rounded-md mt-2 sm:mt-0" />
    : <div className="text-sm font-medium text-gray-900 text-center sm:text-start">
      {value}
    </div>

  return (
    <div className="flex flex-col justify-center items-center sm:ml-4 sm:flex-row sm:self-start ">
      <div className="flex flex-shrink-0 h-12 w-12">
        {avatar}
      </div>
      <div className="flex flex-col justify-center sm:ml-4 sm:justify-start sm:items-start">
        {nameLine}
      </div>
    </div>
  )
};

export default AvatarCell;
