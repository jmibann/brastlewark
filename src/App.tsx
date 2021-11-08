import React, { Suspense, useState, useRef } from 'react';

import {
  AvatarCell,
  Filters,
  FriendsList,
  PhisicalDescription,
  ProfessionsList,
  Table,
  Spinner,
} from './components';

import { SearchResourceType, CacheType } from './types'
import { createResource } from './utils';
import { getInhabitants } from './services';


const createInhabitantsResource = () => createResource(getInhabitants());

const inhabitantsResource = createInhabitantsResource();

function App() {
  const [searchResource, setSearchResource] = useState<SearchResourceType>(inhabitantsResource);
  const imgCache = useRef<CacheType>({});

  const columns = React.useMemo(
    () => [
      {
        Header: () =>
          <div className="flex w-full">Name</div>,
        accessor: 'name',
        Cell: (props: any) => <AvatarCell {...props} imgCache={imgCache} />,
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
          imgCache={imgCache}
          inhabitantsResource={inhabitantsResource}
          setSearchResource={setSearchResource}
        />
      </Suspense>
      {console.log('=============> udpatedCache: ', imgCache)}
      <Suspense fallback={<Spinner />}>
        <Table columns={columns} searchResource={searchResource} />
      </Suspense>
    </div>
  );
}

export default App;
