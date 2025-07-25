import { ListMoviesResponse } from '../../domain';
import { transformListResponse } from '../helpers';

export function listMoviesUseCase(data: ListMoviesResponse) {
  return transformListResponse(data);
}
