import { QueryAsset, QueryCollection, QueryResponse } from './cms';

export const GetAssetByIDQuery = `
query($assetId: String!) {
  asset (id: $assetId) {
    title
    url
  }
}
`;

export interface GetAssetByIDVariables {
  assetId: string;
}

export interface GetAssetByIDBody {
  query: string;
  variables: GetAssetByIDVariables;
}

export interface AssetEntity {
  title: string;
  url: string;
}

export type AssetCollection = QueryCollection<AssetEntity>;

export type AssetQueryResponse = QueryResponse<QueryAsset<AssetEntity>>;
