import { ProfessionRecordType, InhabitantType } from '../types';

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

  return Object.keys(options);
}