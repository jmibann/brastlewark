import React, { Suspense, useState } from 'react';
import classNames from 'classnames';

import { Filters, Table, AvatarCell, Pill } from './components';

import { InhabitantType } from './types'
import { createResource } from './utils';
import { getInhabitants } from './services';

const createInhabitantsResource = () => createResource(getInhabitants());

const inhabitantsResource = createInhabitantsResource();

function App() {
  const [filteredInhabitants, setFilteredInhabitants] = useState<InhabitantType[]>([]);

  const columns = React.useMemo(
    () => [
      {
        Header: () => <div className="flex w-full">Name</div>,
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: "thumbnail",
        ageAccessor: "age",
      },
      {
        Header: () => <div className="flex w-full">Hair Color</div>,
        accessor: 'hair_color',
        heightAccessor: 'height',
        weightAccessor: 'weight',
        Cell: (props: any) => {
          const hairColor = props?.cell?.value?.toLowerCase();
          const circleClass = classNames(
            'm-1 p-3 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
            hairColor === 'black' ? 'bg-black' : `bg-${hairColor}-500`,
          )
          return (
            <div className="flex flex-row items-center self-start w-full">
              <div className="flex flex-col items-start justify-center pl-4 w-1/2">
                <span className="text-sm font-medium text-gray-900 uppercase">height: {props.row.original[props.column.heightAccessor].toFixed(2)}</span >
                <span className="text-sm font-medium text-gray-900 uppercase">weight: {props.row.original[props.column.weightAccessor].toFixed(2)}</span >
              </div>
              <div className={circleClass} />
              <span className="text-sm font-medium text-gray-900 uppercase"> {hairColor}</span >
            </div>)
        },
        // imgAccessor: "thumbnail",
        // ageAccessor: "age",
      },
      {
        Header: 'Professions',
        accessor: 'professions',
        Cell: (props: any) =>
          <div className="w-full flex flex-wrap">
            {props?.cell?.value?.map((prof: string) => <Pill value={prof} />)}
          </div>
      },
      {
        Header: 'Friends',
        accessor: 'friends',
        Cell: (props: any) =>
          <div className="w-full flex flex-col flex-wrap items-center">
            {props?.cell?.value?.map((friend: string) => <span className="text-sm font-medium text-gray-900">{friend}</span>)}
          </div>
      },
    ],
    []
  )

  return (
    <div className="container my-12 mx-auto px-4 md:px-12 flex flex-col items-center">
      <span className="text-3xl font-sans text-blue-700 text-opacity-90 mb-12 ">
        Welcome to Brastlewark Town Census Data
      </span>

      <Suspense fallback={<div>Loading Inhabitants</div>}>
        <Filters
          resource={inhabitantsResource}
          filteredInhabitants={filteredInhabitants}
          setFilteredInhabitants={setFilteredInhabitants}
        />
        <Table columns={columns} data={filteredInhabitants} />
      </Suspense>
    </div>
  );
}

export default App;
