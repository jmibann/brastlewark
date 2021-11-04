import { InhabitantType } from '../types';

const URL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

export const getInhabitants = (): Promise<InhabitantType[]> => {
  return window.fetch(URL)
    .then(res => res.json())
    .then(res => res.Brastlewark)
    .catch(err => err);
}