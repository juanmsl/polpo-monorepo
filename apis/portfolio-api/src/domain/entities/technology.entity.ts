import { QueryCollection } from './content-full.entity';

export type TechnologyEntity = {
  name: string;
  icon: string;
};

export type TechnologiesCollection = QueryCollection<TechnologyEntity>;
