import { SearchQueryResponse } from '../../domain';

import { mapFieldImagesToFullImageURL } from './map-field-images-to-full-image-url';

export function transformListResponse<T extends SearchQueryResponse>(data: T): T {
  return {
    ...data,
    results: data.results.map(movie => mapFieldImagesToFullImageURL(movie)),
  };
}
