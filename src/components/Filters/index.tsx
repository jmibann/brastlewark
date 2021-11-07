import React, { useEffect, useState } from 'react';

import { Input, Select } from '../../components';

import { InhabitantType, FilterParamsType } from '../../types'
import { getProfessionOptions, searchResult } from '../../utils';

type FilterProps = {
  filteredInhabitants: InhabitantType[];
  setFilteredInhabitants: React.Dispatch<React.SetStateAction<InhabitantType[]>>;
  resource: {
    read: () => InhabitantType[] | Promise<InhabitantType[]>;
  }
};

const initialFilterValues: FilterParamsType = {
  age: 0,
  name: '',
  profession: '',
}

const Filters: React.FC<FilterProps> = ({ children, resource, filteredInhabitants, setFilteredInhabitants }) => {
  const inhabitants = resource.read() as InhabitantType[];

  const [professionOptions, setProfessionOptions] = useState<string[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParamsType>(initialFilterValues);

  useEffect(() => {
    setProfessionOptions(getProfessionOptions(inhabitants));
  }, [inhabitants])

  useEffect(() => {
    setFilteredInhabitants(inhabitants);
  }, [inhabitants, setFilteredInhabitants])

  const { age, name } = filterParams;

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

    if (age >= 0) {
      return handleChange(event);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const profession = value === 'all' ? '' : value;

    const updatedParams = { ...filterParams, profession }

    const result = searchResult({
      filterParams: updatedParams,
      inhabitants
    });
    setFilterParams(updatedParams);
    setFilteredInhabitants(result);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {

      const result = searchResult({ filterParams, inhabitants });
      setFilteredInhabitants(result);
    }
  };

  return (
    <div className="flex flex-col justify-around items-center sm:flex-row w-full sm:h-12 mb-4">
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
      <Select options={professionOptions} onChange={handleSelectChange} />
    </div>
  )
};

export default Filters;