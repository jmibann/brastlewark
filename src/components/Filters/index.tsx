import React, { useEffect, useState } from 'react';

import { Input, Select } from '../../components';

import {
  InhabitantType,
  FilterParamsType,
  SearchResourceType,
  ImageCacheType,
} from '../../types';

import {
  createResource,
  getProfessionOptionsAndImgCache,
} from '../../utils';

import { searchInhabitants } from '../../services';

type FilterProps = {
  setImageCache: React.Dispatch<React.SetStateAction<ImageCacheType>>;
  setSearchResource: React.Dispatch<SearchResourceType>;
  inhabitantsResource: {
    read: () => InhabitantType[] | Promise<InhabitantType[]>;
  }
};

const initialFilterValues: FilterParamsType = {
  age: 0,
  name: '',
  profession: 'initialValue',
}

const createSearchResource =
  (filterParams: FilterParamsType) => createResource(searchInhabitants(filterParams));

const Filters: React.FC<FilterProps> = ({ inhabitantsResource, setSearchResource, setImageCache }) => {
  const inhabitants = inhabitantsResource.read() as InhabitantType[];

  const [professionOptions, setProfessionOptions] = useState<string[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParamsType>(initialFilterValues);

  useEffect(() => {
    const { imgCache, professions } = getProfessionOptionsAndImgCache(inhabitants);
    setImageCache(imgCache);
    setProfessionOptions(professions);
  }, [inhabitants, setImageCache])

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

    if (age >= 0) {
      return handleChange(event);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const profession = value === 'all' ? '' : value;

    const updatedParams = { ...filterParams, profession }

    setFilterParams(updatedParams);
    setSearchResource(createSearchResource(updatedParams));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchResource(createSearchResource(filterParams));
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
      <Select options={professionOptions} onChange={handleSelectChange} value={profession} />
    </div>
  )
};

export default Filters;
