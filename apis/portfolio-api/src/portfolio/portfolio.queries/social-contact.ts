import { QueryResponse, QueryCollection } from './cms';

export const GetContactQuery = `
query($locale: String) {
  contactCollection(locale:$locale) {
    items {
      icon
      name
      url
      username
    }
  }
}
`;

export interface GetContactVariables {
  locale: string;
}

export interface GetContactBody {
  query: string;
  variables: GetContactVariables;
}

export interface ContactEntity {
  icon: string;
  name: string;
  url: string;
  username: string;
}

export type ContactsCollection = QueryCollection<ContactEntity>;

export type ContactQueryResponse = QueryResponse<{
  contactCollection: ContactsCollection;
}>;
