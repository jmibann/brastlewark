import { searchResult } from '../utils';
import { InhabitantType, FilterParamsType } from '../types';

export const URL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

export const getInhabitants = (): Promise<InhabitantType[]> => {
  return window.fetch(URL)
    .then(res => res.json())
    .then(res => res.Brastlewark)
};

export const searchInhabitants = (filterParams: FilterParamsType): Promise<InhabitantType[]> => {
  return window.fetch(URL)
    .then(res => res.json())
    .then(res => res.Brastlewark)
    .then(inhabitants => searchResult({ filterParams, inhabitants }))
};