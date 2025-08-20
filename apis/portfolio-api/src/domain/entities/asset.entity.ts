import { QueryAsset, QueryCollection, QueryResponse } from './content-full.entity';

export type AssetEntity = {
  title: string;
  url: string;
};

export type AssetCollection = QueryCollection<AssetEntity>;

export type QueryAssetResponse = QueryResponse<QueryAsset<AssetEntity>>;
