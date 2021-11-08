import React, { Fragment } from 'react';

type SkeletonLineProps = {
  lines?: number;
}

const SkeletonLine: React.FC<SkeletonLineProps> = ({ lines = 1 }) => {
  const array = Array.from(Array(lines).keys());

  return (
    <Fragment>
      {array.map((value) =>
        <div
          key={`line-n-${value}`}
          className="animate-pulse w-28 bg-gray-300 h-4 rounded-md my-2 sm:mt-0"
        />
      )}
    </Fragment>)
}

export default SkeletonLine;