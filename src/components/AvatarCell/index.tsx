import React from 'react';

import { CacheType } from '../../types';

type AvatarCellProps = {
  value: string;
  column: Record<string, string>;
  row: Record<string, Record<string, string>>;
  imgCache: React.MutableRefObject<CacheType>;
};

const AvatarCell: React.FC<AvatarCellProps> = ({ value, column, row, imgCache }) => {
  const imgSrc = row.original[column.imgAccessor];

  return (
    <div className="flex flex-col justify-center items-center sm:ml-4 sm:flex-row sm:self-start ">
      <div className="flex flex-shrink-0 h-12 w-12">
        {console.log('=============> imgCache.current[imgSrc] ', imgCache.current[imgSrc])}
        {
          imgCache.current[imgSrc]
        }
      </div>
      <div className="flex flex-col justify-center sm:ml-4 sm:justify-start sm:items-start">
        <div className="text-sm font-medium text-gray-900 text-center sm:text-start">{value}</div>
      </div>
    </div>
  )
};

export default AvatarCell;
