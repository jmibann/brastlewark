import React from 'react';

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/solid'
import { PageButton } from '../../components';

type PaginationProps = {
  canPreviousPage: Boolean;
  canNextPage: Boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  pageIndex: number;
  pageSize: number;
}

const PAGE_SIZES = [10, 20, 30, 40, 50];

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageSize,
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
}) => {
  return (
    < div className="pagination w-full my-2 hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" >
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <PageButton
          className="rounded-l-md"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">First</span>
          <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </PageButton>


        <PageButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </PageButton>


        <PageButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </PageButton>

        <PageButton
          className="rounded-r-md"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <span className="sr-only">Last</span>
          <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </PageButton>
      </nav>


      <div className="flex gap-x-2 items-baseline">
        <span className="text-sm text-gray-700">
          Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
        </span>
        <label>
          <span className="sr-only">Items Per Page</span>
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZES.map(pageSize => (
              <option key={`pg-size-${pageSize}`} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
};

export default Pagination;