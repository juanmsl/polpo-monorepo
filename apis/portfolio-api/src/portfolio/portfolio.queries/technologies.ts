import { QueryResponse, QueryCollection } from './cms';

export const GetTechnologiesQuery = `
query($locale: String) {
  technologyCollection(locale:$locale) {
    items {
      name
      icon
    }
  }
}
`;

export interface GetTechnologiesVariables {
  locale: string;
}

export interface GetTechnologiesBody {
  query: string;
  variables: GetTechnologiesVariables;
}

export interface TechnologyEntity {
  name: string;
  icon: string;
}

export type TechnologiesCollection = QueryCollection<TechnologyEntity>;

export type TechnologiesQueryResponse = QueryResponse<{
  technologyCollection: TechnologiesCollection;
}>;
