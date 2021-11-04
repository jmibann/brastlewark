import React, { Suspense, useState } from 'react';

import { Filters, Input, Select, CardsBoard } from './components';

import { InhabitantType, FilterType } from './types'
import { createResource } from './utils';
import { getInhabitants } from './services';


const createInhabitantsResource = () => createResource(getInhabitants());

const inhabitantsResource = createInhabitantsResource();

const initialFilterValues: FilterType = {
  age: 0,
  name: '',
  profession: '',
}

function App() {
  const [professionOptions, setProfessionOptions] = useState<string[]>([]);
  const [filteredInhabitants, setFilteredInhabitants] = useState<InhabitantType[]>();
  const [filterParams, setFilterParams] = useState<FilterType>(initialFilterValues);

  const { age, name, profession } = filterParams;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    const updatedParams = { ...filterParams, [name]: value };
    setFilterParams(updatedParams);
  };

  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const age = Number(event.target.value);

    if (isNaN(age)) {
      setFilterParams(prev => ({ ...prev, age: 0 }));
      return;
    }

    if (age > 0) {
      return handleChange(event);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const updatedParams = { ...filterParams, profession: event.target.value };
    setFilterParams(updatedParams);

    // const searchResult = [...filterByPosition(event.target.value, players)];
    // setFilteredPlayers({ filteredPlayers: searchResult });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchResult();
    }
  };

  const searchResult = () => {
    const byAge = Boolean(age);
    const byName = Boolean(name.length);
    const byProfession = Boolean(profession.length);

    const isSearchingBy = byName || byProfession || byAge;

    // if (isSearchingBy) {
    //   let searchResult: PlayerType[] = [...players];

    //   if (byAge) searchResult = [...filterByAge(Number(age), searchResult)];
    //   if (byName) searchResult = [...filterByName(name, searchResult)];
    //   if (byProfession) searchResult = [...filterByPosition(position, searchResult)];

    //   dispatch(setFilteredPlayers({ filteredPlayers: searchResult }));
    // }
  };

  return (
    <div className="container my-12 mx-auto px-4 md:px-12 flex flex-col items-center">
      <span className="text-3xl font-sans text-blue-700 text-opacity-90 mb-12 ">
        Welcome to Brastlewark Town Census Data
      </span>

      <Suspense fallback={<div>Loading Inhabitants</div>}>
        <Filters
          resource={inhabitantsResource}
          setProfessionOptions={setProfessionOptions}
        >
          <Input
            name="name"
            value={name}
            placeholder="name"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Input
            name="age"
            value={age === 0 ? '' : age}
            placeholder="age"
            onChange={handleAge}
            onKeyDown={handleKeyPress}
          />
          <Select options={professionOptions} />
        </Filters>

        <CardsBoard inhabitants={filteredInhabitants} />
      </Suspense>
    </div>
  );
}

export default App;
