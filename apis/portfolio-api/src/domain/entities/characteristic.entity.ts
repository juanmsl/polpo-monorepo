import { QueryCollection } from './content-full.entity';

export type CharacteristicEntity = {
  title: string;
  icon: string;
};

export type CharacteristicCollection = QueryCollection<CharacteristicEntity>;
