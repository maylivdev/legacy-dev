export interface Region {
  id: string;
  name_kk: string;
  name_ru: string;
  name_en: string;
  latitude: number;
  longitude: number;
}

export interface UnescoDomain {
  id: string;
  name_kk: string;
  name_ru: string;
  name_en: string;
  description_kk: string;
  description_ru: string;
  description_en: string;
  icon_url?: string;
}

export interface IchElement {
  id: string;
  name_kk: string;
  name_ru: string;
  name_en: string;
  brief_description_kk: string;
  brief_description_ru: string;
  brief_description_en: string;
  detailed_description_kk: string;
  detailed_description_ru: string;
  detailed_description_en: string;
  region_id: string;
  unesco_domain_id: string;
  latitude: number;
  longitude: number;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  created_by: string;
  photos: string[];
  videos: string[];
  audio: string[];
}

export interface Bearer {
  id: string;
  full_name: string;
  photo_url: string;
  biography: string;
  region_id: string;
  awards: string;
  created_at: string;
  updated_at: string;
  video_interviews: string[];
}

export interface BearerElement {
  bearer_id: string;
  element_id: string;
}

export interface NewsItem {
  id: string;
  title_kk: string;
  title_ru: string;
  title_en: string;
  content_kk: string;
  content_ru: string;
  content_en: string;
  featured_image_url: string;
  category: 'new_elements' | 'festivals' | 'research' | 'cooperation' | 'education' | 'publications';
  published_at: string;
  status: 'draft' | 'published';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type Language = 'kk' | 'ru' | 'en';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLocalizedField(item: any, field: string, lang: Language): string {
  return item[`${field}_${lang}`] || item[`${field}_kk`] || '';
}
