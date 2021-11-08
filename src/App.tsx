import React, { Suspense, useState } from 'react';

import {
  AvatarCell,
  Filters,
  FriendsList,
  InvisibleImages,
  PhisicalDescription,
  ProfessionsList,
  Table,
  Spinner,
} from './components';

import { SearchResourceType, ImageCacheType } from './types'
import { createResource, LOADING_DATA_TABLE } from './utils';
import { getInhabitants } from './services';


const createInhabitantsResource = () => createResource(getInhabitants());

const inhabitantsResource = createInhabitantsResource();

const LOADING_TABLE_COL = [
  {
    Header: () =>
      <div className="flex w-full">Name</div>,
    Cell: (props) => <AvatarCell {...props} isLoading />,
    accessor: 'hair_color',
  },
  {
    accessor: 'age',
    Header: () =>
      <div className="flex w-full">Description</div>,
    Cell: (props) =>
      <PhisicalDescription {...props} isLoading />,
  },
  {
    accessor: 'friends',
    Header: 'Professions',
    Cell: (props) =>
      <ProfessionsList  {...props} isLoading />
  },
  {
    accessor: 'height',
    Header: 'Friends',
    Cell: (props) =>
      <FriendsList  {...props} isLoading />
  },
];

function App() {
  const [searchResource, setSearchResource] = useState<SearchResourceType>(inhabitantsResource);
  const [imgCache, setImageCache] = useState<ImageCacheType>([]);

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
        Cell: (props) =>
          <ProfessionsList professions={props?.cell?.value} />
      },
      {
        Header: 'Friends',
        accessor: 'friends',
        Cell: (props) =>
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
          inhabitantsResource={inhabitantsResource}
          setSearchResource={setSearchResource}
          setImageCache={setImageCache}
        />
      </Suspense>

      <Suspense fallback={
        <Table
          columns={LOADING_TABLE_COL}
          searchResource={{ read: () => LOADING_DATA_TABLE }}
        />}
      >
        <Table columns={columns} searchResource={searchResource} />
      </Suspense>

      <InvisibleImages imgCache={imgCache} />
    </div>
  );
}

export default App;
