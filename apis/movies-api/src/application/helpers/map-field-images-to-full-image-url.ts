import { MovieEntity } from '../../domain';

export function mapFieldImagesToFullImageURL<T extends MovieEntity>(movie: T, size: string = 'w500'): T {
  return {
    ...movie,
    backdrop_path: `https://image.tmdb.org/t/p/${size}${movie.backdrop_path}`,
    poster_path: `https://image.tmdb.org/t/p/${size}${movie.backdrop_path}`,
  };
}
