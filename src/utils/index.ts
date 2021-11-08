import {
  InhabitantType,
  SearchResultType,
  ProfessionRecordType,
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

export const getProfessionOptionsAndImgCache = (inhabitants: InhabitantType[]) => {
  let options = {};
  let imgCache = {};

  inhabitants?.forEach((gnome) => {
    options = {
      ...options,
      ...getUnrecordedGnomeProfessions(gnome.professions, options)
    }
    if (!imgCache[gnome.thumbnail]) {
      imgCache = { ...imgCache, [gnome.thumbnail]: gnome.thumbnail };
    }
  }
  );

  return {
    professions: Object.keys(options).sort(),
    imgCache: Object.keys(imgCache),
  };
};

const filterByAge = (age: number, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => age === gnome.age);

const filterByName = (name: string, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => gnome?.name?.toLowerCase().includes(name.toLowerCase()));

const filterByProfession = (profession: string, inhabitants: InhabitantType[]) =>
  inhabitants.filter((gnome) => {
    let isFound = gnome?.professions?.find(prof => prof.includes(profession));
    return Boolean(isFound);
  });


export const searchResult = ({ filterParams, inhabitants }: SearchResultType) => {
  const { age, name, profession } = filterParams;

  const byAge = Boolean(age);
  const byName = Boolean(name.length);
  const byProfession =
    Boolean((profession === 'all' || profession === 'initialValue') ? '' : profession.length);

  const isSearchingBy = byName || byProfession || byAge;

  let searchResult = [...inhabitants];

  if (isSearchingBy) {
    if (byAge) searchResult = [...filterByAge(Number(age), searchResult)];
    if (byName) searchResult = [...filterByName(name, searchResult)];
    if (byProfession) searchResult = [...filterByProfession(profession, searchResult)];
  }

  return [...searchResult];
};

export const LOADING_DATA_TABLE = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  age: undefined,
  name: undefined,
  height: undefined,
  weight: undefined,
  friends: undefined,
  thumbnail: undefined,
  hair_color: undefined,
  professions: undefined,
}));