import { QueryCollection } from './cms';

export interface LinkEntity {
  url: string;
  label: string;
  icon: string;
}

export type LinkCollection = QueryCollection<LinkEntity>;
