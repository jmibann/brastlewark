import React, { useEffect } from 'react';

import { InhabitantType, SearchResourceType } from '../../types';
import { useTable, usePagination } from 'react-table';

import { Pagination, NoItemFound } from '../../components';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

type TableProps = {
  searchResource: SearchResourceType;
  columns: any;
  ariaLabel?: string;
}

const Table: React.FC<TableProps> = ({ columns, searchResource, ariaLabel }) => {
  const data = searchResource.read() as InhabitantType[];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 1 }, }, usePagination);

  useEffect(() => {
    gotoPage(0)
  }, [data, gotoPage]);

  return (
    <>
      <div
        aria-label={ariaLabel}
        className="w-full flex flex-col my-2 align-middle shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <TableHeader headerGroups={headerGroups} />
          {
            data.length ?
              <TableBody
                page={page}
                getTableBodyProps={getTableBodyProps}
                prepareRow={prepareRow}
              />
              : <NoItemFound />
          }
        </table >
      </div>

      <Pagination
        pageSize={pageSize}
        pageIndex={pageIndex}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
      />
    </>
  )
};


export default Table;