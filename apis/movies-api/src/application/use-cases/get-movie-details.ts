import { GetMovieDetailsResponse } from '../../domain';
import { mapFieldImagesToFullImageURL } from '../helpers';

export function getMovieDetails(data: GetMovieDetailsResponse) {
  return mapFieldImagesToFullImageURL(data, 'original');
}
