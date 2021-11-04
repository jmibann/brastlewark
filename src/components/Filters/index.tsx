import React, { useEffect } from 'react';

import { InhabitantType } from '../../types'
import { getProfessionOptions } from '../../utils';

type FilterType = {
  setProfessionOptions: React.Dispatch<React.SetStateAction<string[]>>;
  resource: {
    read: () => InhabitantType[] | Promise<InhabitantType[]>;
  }
};



const Filters: React.FC<FilterType> = ({ children, resource, setProfessionOptions }) => {
  const inhabitants = resource.read() as InhabitantType[];

  useEffect(() => {
    setProfessionOptions(getProfessionOptions(inhabitants));
  }, [])

  return (
    <div className="flex flex-row w-full h-12 justify-around items-center bg-pink-500">
      {children}
    </div>
  )
};

export default Filters;