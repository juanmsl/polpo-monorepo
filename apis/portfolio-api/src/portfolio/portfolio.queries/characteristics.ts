import { QueryResponse, QueryCollection } from './cms';

export const GetCharacteristicsQuery = `
query($locale: String) {
  characteristicCollection(locale:$locale, order:[title_ASC]) {
    items {
      title
      icon
    }
  }
}
`;

export interface GetCharacteristicsVariables {
  locale: string;
}

export interface GetCharacteristicsBody {
  query: string;
  variables: GetCharacteristicsVariables;
}

export interface CharacteristicEntity {
  title: string;
  icon: string;
}

export type CharacteristicCollection = QueryCollection<CharacteristicEntity>;

export type GetCharacteristicsQueryResponse = QueryResponse<{
  characteristicCollection: CharacteristicCollection;
}>;
