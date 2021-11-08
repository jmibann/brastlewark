export type InhabitantType = {
  id: number;
  age: number;
  name: string;
  height: number;
  weight: number;
  friends: string[];
  thumbnail: string;
  hair_color: string;
  professions: string[];
};

export type ProfessionRecordType = Record<string, string>;

export type FilterParamsType = {
  age: number;
  name: string;
  profession: string;
};

export type SearchResultType = {
  filterParams: FilterParamsType;
  inhabitants: InhabitantType[];
};

export type SearchResourceType = {
  read: () => InhabitantType[] | Promise<InhabitantType[]>;
};

export type CacheType = Record<string, JSX.Element>;

export type UpdateCacheType = {
  imgCache: React.MutableRefObject<CacheType>;
  inhabitants: InhabitantType[];
}