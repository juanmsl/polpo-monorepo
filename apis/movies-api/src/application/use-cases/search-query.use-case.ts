import { SearchQueryResponse } from '../../domain';
import { transformListResponse } from '../helpers';

export function searchQueryUseCase(data: SearchQueryResponse) {
  return transformListResponse(data);
}
