export interface QueryResponse<T> {
  data: T;
}

export interface QueryAsset<T> {
  asset: T;
}

export interface QueryCollection<T> {
  items: Array<T>;
}
