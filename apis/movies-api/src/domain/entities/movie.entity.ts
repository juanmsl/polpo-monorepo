export enum MoviesList {
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
}

export interface MovieEntity {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<GenreEntity['id']>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenreEntity {
  id: number;
  name: string;
}

export interface CountryEntity {
  iso_3166_1: string;
  name: string;
}

export interface CompanyEntity {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface LanguageEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CollectionEntity {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface MovieDetailsEntity extends MovieEntity {
  belongs_to_collection: CollectionEntity | null;
  budget: number;
  genres: Array<GenreEntity>;
  homepage: string;
  imdb_id: string | null;
  origin_country: Array<string>;
  production_companies: Array<CompanyEntity>;
  production_countries: Array<CountryEntity>;
  revenue: number;
  runtime: number;
  spoken_languages: Array<LanguageEntity>;
  status: string;
  tagline: string;
  genre_ids: [];
}
