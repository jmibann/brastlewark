import React, { Suspense, useState } from 'react';

import {
  AvatarCell,
  Filters,
  FriendsList,
  PhisicalDescription,
  ProfessionsList,
  Table,
  Spinner,
} from './components';

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
        Header: () =>
          <div className="flex w-full">Name</div>,
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: "thumbnail",
      },
      {
        Header: () =>
          <div className="flex w-full">Description</div>,
        accessor: 'hair_color',
        ageAccessor: "age",
        heightAccessor: 'height',
        weightAccessor: 'weight',
        Cell: (props: any) =>
          <PhisicalDescription {...props} />,
      },
      {
        Header: 'Professions',
        accessor: 'professions',
        Cell: (props: any) =>
          <ProfessionsList professions={props?.cell?.value} />
      },
      {
        Header: 'Friends',
        accessor: 'friends',
        Cell: (props: any) =>
          <FriendsList friends={props?.cell?.value} />
      },
    ],
    []
  )

  return (
    <div className="container flex flex-col items-center my-12 mx-auto px-4 md:px-12">
      <span className="text-3xl font-sans text-blue-700 text-opacity-90 mb-12 text-center">
        Welcome to Brastlewark Town Census Data
      </span>
      <Suspense fallback={<Spinner />}>
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
