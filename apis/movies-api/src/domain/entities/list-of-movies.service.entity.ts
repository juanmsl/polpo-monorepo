import { MoviesList } from './movie.entity';
import { SearchQueryResponse } from './search-query.service.entity';

export interface ListMoviesParams {
  category: MoviesList;
  page?: number;
  sort_by?: string;
  include_video?: boolean;
  include_adult?: boolean;
  language?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
}

export interface ListMoviesResponse extends SearchQueryResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}
