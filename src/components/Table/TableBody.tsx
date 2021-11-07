import React from 'react';

import { InhabitantType } from '../../types';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table'

type TableBodyPropsType = {
  page: Row<InhabitantType>[];
  getTableBodyProps: (propGetter?: TableBodyPropGetter<InhabitantType> | undefined) => TableBodyProps;
  prepareRow: (row: Row<InhabitantType>) => void;
}

const TableBody: React.FC<TableBodyPropsType> = ({ page, getTableBodyProps, prepareRow }) => {
  const bodyClass = "flex flex-col bg-white divide-y divide-gray-200";
  const rowClass = "w-full h-60 sm:h-56 md:h-52 lg:h-48 flex flex-row justify-center items-center py-2";
  const dataClass = "w-full flex flex-wrap flex-col justify-center items-center";

  return (
    <tbody {...getTableBodyProps()} className={bodyClass}>
      {page.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()} className={rowClass}>
            {row.cells.map(cell => (
              <td {...cell.getCellProps()} className={dataClass}>
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  )
}



export default TableBody;