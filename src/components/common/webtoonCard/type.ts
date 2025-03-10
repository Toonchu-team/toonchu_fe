export type Tag = {
  id: number;
  tag_name: string;
  category: string;
};

export type WebtoonData = {
  title: string;
  author: string;
  thumbnail: string;
  webtoon_url: string;
  publication_day: string;
  platform: string;
  serial_day: string[];
  serialization_cycle: string;
  created_at: string;
  updated_at: string;
  is_new: boolean;
  is_completed: boolean;
  like_count: number;
  view_count: number;
  is_approved: string;
  tags: Tag[];
};
