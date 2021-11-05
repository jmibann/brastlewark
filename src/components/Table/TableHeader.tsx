import React from 'react';

import { InhabitantType } from '../../types';
import { HeaderGroup } from 'react-table'

type TableHeaderPropsType = {
  headerGroups: HeaderGroup<InhabitantType>[];

}

const TableHeader: React.FC<TableHeaderPropsType> = ({ headerGroups }) => {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()} className="flex w-full justify-around" >
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              scope="col"
              className="flex justify-start group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}



export default TableHeader;