import {
  GetMovieDetailsParams,
  GetMovieDetailsResponse,
  ListGenreResponse,
  ListMoviesParams,
  ListMoviesResponse,
  SearchQueryParams,
  SearchQueryResponse,
} from '../entities';

export interface MoviesPort {
  listMovies(params: ListMoviesParams): Promise<ListMoviesResponse>;
  getMovieDetails(params: GetMovieDetailsParams): Promise<GetMovieDetailsResponse>;
  listGenres(): Promise<ListGenreResponse>;
  searchQuery(params: SearchQueryParams): Promise<SearchQueryResponse>;
}
