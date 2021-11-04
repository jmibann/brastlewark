import React, { Suspense, useState } from 'react';

import { Filters, CardsBoard } from './components';

import { InhabitantType } from './types'
import { createResource } from './utils';
import { getInhabitants } from './services';


const createInhabitantsResource = () => createResource(getInhabitants());

const inhabitantsResource = createInhabitantsResource();

function App() {
  const [filteredInhabitants, setFilteredInhabitants] = useState<InhabitantType[]>([]);

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
      </Suspense>
      <CardsBoard inhabitants={filteredInhabitants} />
    </div>
  );
}

export default App;
