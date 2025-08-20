import { QueryCollection } from './content-full.entity';

export type LinkEntity = {
  url: string;
  label: string;
  icon: string;
};

export type LinkCollection = QueryCollection<LinkEntity>;
