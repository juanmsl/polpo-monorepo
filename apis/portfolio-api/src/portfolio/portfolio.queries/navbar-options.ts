import { QueryResponse, QueryCollection } from './cms';

export const GetNavbarOptionsQuery = `
query($locale: String) {
  navbarOptionCollection(locale:$locale, order:[order_ASC]) {
    items {
      label
      page
      icon
    }
  }
}
`;

export interface GetNavbarOptionsVariables {
  locale: string;
}

export interface GetNavbarOptionsBody {
  query: string;
  variables: GetNavbarOptionsVariables;
}

export interface NavbarOptionEntity {
  label: string;
  page: string;
  icon: string;
  order: number;
  openInNewTab: boolean;
}

export type NavbarOptionCollection = QueryCollection<NavbarOptionEntity>;

export type GetNavbarOptionsQueryResponse = QueryResponse<{
  navbarOptionCollection: NavbarOptionCollection;
}>;
