import React from 'react';

const Spinner: React.FC<{}> = () => {
  return (
    <div className="flex flex-col justify-around items-center sm:flex-row w-full sm:h-12 mb-4" aria-label='loading filters'>
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 py-0.5 my-12 sm-my-0 sm:py-0 sm:my-0"
      />
    </div>
  )
};

export default Spinner;