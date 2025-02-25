export type Platform = 'all' | 'naver' | 'kakaopage' | 'kakao' | 'postype' | 'others';
export type SerialDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type SerializationCycle = '1weeks' | '2weeks' | '10days' | '20days' | 'month' | 'etc';
export type IsApproved = 'pending' | 'approved' | 'rejected';

export interface WebtoonRegisterRequest {
  title: string;
  author: string;
  thumbnail: File;
  webtoon_url: string;
  publication_day: string;
  platform: Platform;
  serial_day: SerialDay[];
  serialization_cycle: SerializationCycle;
  is_new?: boolean;
  is_completed?: boolean;
  is_approved: 'pending';
  tags: Array<{
    tag_name: string;
    category: string;
  }>;
}
  
  export interface WebtoonRegisterResponse {
    title: string;
    author: string;
    thumbnail: string;
    webtoon_url: string;
    publication_day: string;
    platform: string;
    serial_day: SerialDay[];
    serialization_cycle: string;
    created_at: string;
    updated_at: string;
    is_new: boolean;
    is_completed: boolean;
    like_count: 0,
    view_count: 0,
    is_approved: 'pending';
    tags: Array<{
      id: number;
      tag_name: string;
      category: string;
    }>;
  }