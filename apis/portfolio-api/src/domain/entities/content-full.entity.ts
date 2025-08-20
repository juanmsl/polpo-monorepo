export type QueryResponse<T> = {
  data: T;
};

export type QueryAsset<T> = {
  asset: T;
};

export type QueryCollection<T> = {
  items: Array<T>;
};
