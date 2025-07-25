import { MovieDetailsEntity } from '..';

export interface GetMovieDetailsParams {
  movieId: MovieDetailsEntity['id'];
}

export interface GetMovieDetailsResponse extends MovieDetailsEntity {}
