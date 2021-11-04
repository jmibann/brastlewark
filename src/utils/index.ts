import {
  ProfessionRecordType,
  InhabitantType,
  SearchResultType,
} from '../types';

export function createResource<T>(promise: Promise<T>): {
  read: () => T | Promise<T>
} {
  let status = 'PENDING';

  let result: T | Promise<any> = promise.then(
    resolve => {
      result = resolve;
      status = "SUCCESS";
    },
    rejected => {
      result = rejected;
      status = "ERROR"
    }
  );

  return {
    read: () => {
      if (status === 'PENDING') throw result;
      if (status === 'ERROR') throw result;
      if (status === 'SUCCESS') return result;
      throw new Error('This should be impossible');
    }
  }

};

const getUnrecordedGnomeProfessions = (gnomeProfessions: string[], record: ProfessionRecordType) => {
  let professionRecord = { ...record };

  gnomeProfessions?.forEach(profession => {
    const isAlreadyRecorded = Boolean(professionRecord[profession]);

    if (!isAlreadyRecorded) {
      professionRecord = { ...professionRecord, [profession]: profession };
    }
  })

  return professionRecord
};

export const getProfessionOptions = (inhabitants: InhabitantType[]) => {
  let options = {};

  inhabitants?.forEach((gnome) =>
    options = {
      ...options,
      ...getUnrecordedGnomeProfessions(gnome.professions, options)
    }
  );

  return Object.keys(options).sort();
};

export const filterByAge = (age: number, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => age === gnome.age);

export const filterByName = (name: string, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => gnome?.name?.toLowerCase().includes(name.toLowerCase()));

export const filterByProfession = (profession: string, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => {
    let isFound = gnome?.professions?.find(prof => prof.includes(profession));
    return Boolean(isFound);
  });


export const searchResult = ({ filterParams, inhabitants }: SearchResultType) => {
  const { age, name, profession } = filterParams;

  const byAge = Boolean(age);
  const byName = Boolean(name.length);
  const byProfession = Boolean(profession.length);

  const isSearchingBy = byName || byProfession || byAge;

  let searchResult = [...inhabitants];

  if (isSearchingBy) {
    if (byAge) searchResult = [...filterByAge(Number(age), searchResult)];
    if (byName) searchResult = [...filterByName(name, searchResult)];
    if (byProfession) searchResult = [...filterByProfession(profession, searchResult)];
  }

  return [...searchResult];
};
