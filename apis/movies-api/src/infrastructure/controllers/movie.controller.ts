import { getMovieDetails, listMoviesUseCase, searchQueryUseCase } from '../../application';
import { GetMovieDetailsParams, ListMoviesParams, MoviesPort, SearchQueryParams } from '../../domain';

export class MoviesController implements MoviesPort {
  private adapter: MoviesPort;

  constructor(adapter: MoviesPort) {
    this.adapter = adapter;
  }

  async listMovies(params: ListMoviesParams) {
    return listMoviesUseCase(await this.adapter.listMovies(params));
  }

  async getMovieDetails(params: GetMovieDetailsParams) {
    return getMovieDetails(await this.adapter.getMovieDetails(params));
  }

  listGenres() {
    return this.adapter.listGenres();
  }

  async searchQuery(params: SearchQueryParams) {
    return searchQueryUseCase(await this.adapter.searchQuery(params));
  }
}
