import { QueryCollection } from './content-full.entity';

export type NavbarOptionEntity = {
  label: string;
  page: string;
  icon: string;
  order: number;
  openInNewTab: boolean;
};

export type NavbarOptionCollection = QueryCollection<NavbarOptionEntity>;
