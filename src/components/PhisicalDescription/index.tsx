import React from 'react';
import classNames from 'classnames';

type PhisicalDescriptionProps = {
  cell: {
    value: string;
  };
  column: {
    heightAccessor: string;
    weightAccessor: string;
  };
  row: {
    original: string[];
  }
}

const PhisicalDescription: React.FC<PhisicalDescriptionProps> = ({ cell, column, row }) => {
  const hairColor = cell?.value?.toLowerCase();
  const height = row.original[column.heightAccessor].toFixed(2);
  const weight = row.original[column.weightAccessor].toFixed(2);

  const circleClass = classNames(
    'm-1 p-2 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
    hairColor === 'black' ? 'bg-black' : `bg-${hairColor}-500`,
  )
  return (
    <div className="flex flex-col items-start justify-center pl-4 w-full">
      <span className="text-sm font-medium text-gray-900 uppercase w-1/2 mb-2">
        height: {height}
      </span >
      <span className="text-sm font-medium text-gray-900 uppercase mb-2">
        weight: {weight}
      </span >
      <div className="flex flex-col items-start justify-start w-full sm:flex-row sm:items-center">
        <span className="text-sm font-medium text-gray-900 uppercase">
          Hair:
        </span >
        <div className="flex flex-row items-center justify-items-start w-full">
          <div className={circleClass} />
          <span className="text-sm font-medium text-gray-900 uppercase">{hairColor}</span >
        </div>
      </div>
    </div>
  )
}

export default PhisicalDescription;