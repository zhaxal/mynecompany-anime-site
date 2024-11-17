export interface SearchResponse {
  results: Anime[];
}

interface MaterialData {
  title: string;
  anime_title: string;
  anime_kind: string;
  anime_status: string;
  year: number;
  description: string;
  anime_description: string;
  anime_genres: string[];
  shikimori_rating: number;
  episodes_total: number;
  episodes_aired: number;
}

export interface Anime {
  title: string;
  link: string;
  title_orig: string;
  other_title: string;
  type: string;
  year: number;
  last_episode: number;
  shikimori_id: number;
  material_data?: MaterialData;
}
