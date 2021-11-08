import React, { Fragment } from 'react';

type SkeletonLineProps = {
  pills?: number;
}

const SkeletonPill: React.FC<SkeletonLineProps> = ({ pills = 1 }) => {
  const array = Array.from(Array(pills).keys());

  return (
    <Fragment>
      {array.map((value) =>
        <div
          key={`line-n-${value}`}
          className="animate-pulse rounded-full py-3 px-12 bg-gray-300 h-4 rounded-md my-1"
        />
      )}
    </Fragment>)
}

export default SkeletonPill;