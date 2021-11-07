import React from 'react';

const Spinner: React.FC<{}> = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-full h-60" />
      <div
        className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"
      />
    </div>
  )
};

export default Spinner;