import { HttpClient } from '@polpo/http-client';

import {
  GetMovieDetailsParams,
  GetMovieDetailsResponse,
  ListGenreResponse,
  ListMoviesParams,
  ListMoviesResponse,
  MoviesPort,
  SearchQueryParams,
  SearchQueryResponse,
} from '../../domain';

export interface MoviesAdapterConfig {
  apiURL: string;
  accessToken: string;
}

export class MoviesAdapter extends HttpClient implements MoviesPort {
  constructor({ apiURL, accessToken }: MoviesAdapterConfig) {
    super({
      baseURL: apiURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
  }

  async listMovies({ category, ...params }: ListMoviesParams): Promise<ListMoviesResponse> {
    const { data } = await this.call<ListMoviesResponse>({
      url: `/movie/${category}`,
      method: 'GET',
      params: params,
    });

    return data;
  }

  async getMovieDetails({ movieId }: GetMovieDetailsParams): Promise<GetMovieDetailsResponse> {
    const { data } = await this.call<GetMovieDetailsResponse>({
      url: `/movie/${movieId}`,
      method: 'GET',
    });

    return data;
  }

  async listGenres(): Promise<ListGenreResponse> {
    const { data } = await this.call<ListGenreResponse>({
      url: '/genre/movie/list',
      method: 'GET',
    });

    return data;
  }

  async searchQuery(params: SearchQueryParams): Promise<SearchQueryResponse> {
    const { data } = await this.call<SearchQueryResponse>({
      url: '/search/movie',
      method: 'GET',
      params: params,
    });

    return data;
  }
}
