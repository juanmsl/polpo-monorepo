import {
  MoviesPort,
  ListMoviesResponse,
  MovieDetailsInstance,
  GetMovieDetailsResponse,
  ListGenreResponse,
  GenresInstance,
  SearchQueryResponse,
  MoviesInstance,
} from '../../domain';

export class MoviesMockAdapter implements MoviesPort {
  static timeout: number = 1000;

  async listMovies(): Promise<ListMoviesResponse> {
    return new Promise<ListMoviesResponse>(resolve => {
      setTimeout(() => {
        resolve({
          dates: {
            minimum: '2024-04-17',
            maximum: '2024-05-29',
          },
          page: 1,
          results: MoviesInstance,
          total_pages: 1,
          total_results: MoviesInstance.length,
        });
      }, MoviesMockAdapter.timeout);
    });
  }

  async getMovieDetails(): Promise<GetMovieDetailsResponse> {
    return new Promise<GetMovieDetailsResponse>(resolve => {
      setTimeout(() => {
        resolve(MovieDetailsInstance);
      }, MoviesMockAdapter.timeout);
    });
  }

  async listGenres(): Promise<ListGenreResponse> {
    return new Promise<ListGenreResponse>(resolve => {
      setTimeout(() => {
        resolve({
          genres: GenresInstance,
        });
      }, MoviesMockAdapter.timeout);
    });
  }

  async searchQuery(): Promise<SearchQueryResponse> {
    return new Promise<SearchQueryResponse>(resolve => {
      setTimeout(() => {
        resolve({
          page: 1,
          results: MoviesInstance,
          total_pages: 1,
          total_results: MoviesInstance.length,
        });
      }, MoviesMockAdapter.timeout);
    });
  }
}
