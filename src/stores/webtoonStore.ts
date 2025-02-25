import { Tag, WebtoonData } from "@/components/common/webtoonCard/type";
import { engProviderMapping } from "@/lib/utils/engFomatter";
import { create } from "zustand";

interface WebtoonState {
  webtoons: WebtoonData[]; // 웹툰 목록
  tagList: Tag[]; // 태그 목록
  selectedProvider: string; // 배급사
  selectedTag: string; // 검색 태그
  selectedTerm: string; // 검색어
  selectedTagIds: number[]; // 선택한 태그
  selectedTags: string[]; // 선택한 태그

  setSelectedProvider: (provider: string) => void;
  setSelectedTag: (tag: string) => void;
  setSelectedTerm: (term: string) => void;
  toggleTag: (tag: string, tagId: number) => void;

  resetSearchState: () => void;
  resetTag: () => void;

  allWebtoons: () => Promise<void>; // 웹툰 전체 목록 조회
  globalSearch: (
    prov: string,
    selectedTag?: string,
    selectedTerm?: string,
  ) => Promise<void>; // 통합 검색
  categoryTags: (category: string) => Promise<void>; // 카테고리별 태그 조회
  tagSearch: (
    selectedTagIds: number[],
    selectedTags: string[],
  ) => Promise<void>; // 태그별 검색
  tagSort: (selectedTagIds: number[], sort: string) => Promise<void>;
  daySearch: (serial_day: string, serial_type: string) => Promise<void>; // 연재별 검색
  daySort: (
    serial_day: string,
    serial_type: string,
    sort: string,
  ) => Promise<void>;
  etcSearch: (serial_type: string) => Promise<void>;
  etcSort: (sort: string, serial_type: string) => Promise<void>;
}

const useWebtoonStore = create<WebtoonState>((set) => ({
  webtoons: [],
  tagList: [],
  selectedProvider: "",
  selectedTag: "",
  selectedTerm: "",
  selectedTagIds: [],
  selectedTags: [],

  setSelectedProvider: (provider: string) =>
    set({ selectedProvider: provider }),
  setSelectedTag: (tag: string) => set({ selectedTag: tag }),
  setSelectedTerm: (term: string) => set({ selectedTerm: term }),

  resetSearchState: () =>
    set({
      webtoons: [],
      selectedProvider: "",
      selectedTag: "",
      selectedTerm: "",
      selectedTagIds: [],
      selectedTags: [],
    }),

  resetTag: () => {
    set(() => {
      return {
        selectedTags: [],
        selectedTagIds: [],
      };
    });

    // 상태 업데이트 후 실행되도록 setTimeout 사용
    setTimeout(() => {
      const store = useWebtoonStore.getState(); // 최신 상태 가져오기
      store.tagSearch(store.selectedTagIds, store.selectedTags);
    }, 0);
  },

  toggleTag: (tag: string, tagId: number) =>
    set((state) => {
      const isSelected = state.selectedTags.includes(tag);
      const isSelectedId = state.selectedTagIds.includes(tagId);

      const updatedTags = isSelected
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag];

      const updatedTagIds = isSelectedId
        ? state.selectedTagIds.filter((t) => t !== tagId)
        : [...state.selectedTagIds, tagId];

      // 상태 업데이트
      const newState = {
        selectedTags: updatedTags,
        selectedTagIds: updatedTagIds,
      };

      // 상태 업데이트 후 실행되도록 setTimeout 사용
      setTimeout(() => {
        const store = useWebtoonStore.getState(); // 최신 상태 가져오기
        store.tagSearch(store.selectedTagIds, store.selectedTags);
      }, 0);

      return newState;
    }),

  // 전체 웹툰 목록 조회
  allWebtoons: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/request`,
      );
      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching all webtoons:", error);
    }
  },

  // 통합 검색 API (배급사, 태그, 검색어 적용)
  globalSearch: async (prov, searchTag?, searchTerm?) => {
    try {
      const queryString = `provider=${engProviderMapping[prov]}${searchTag ? `&tag=${searchTag}` : ""}${searchTerm ? `&term=${searchTerm}` : ""}`;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/search?${queryString}`,
      );
      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({
        webtoons: data,
        selectedProvider: prov,
        selectedTag: searchTag,
        selectedTerm: searchTerm,
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  // 카테고리별 태그 조회
  categoryTags: async (category) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/tag?category=${category}`,
      );
      if (!res.ok)
        throw new Error(
          "태그 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ tagList: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  // 태그별 검색
  // 드롭다운에서 태그 선택 시
  // 웹툰 카드에서 태그 선택 시
  tagSearch: async (selectedTagIds, selectedTags) => {
    try {
      const queryString = selectedTagIds.map((id) => `id=${id}`).join("&");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/search/tag?${queryString}`,
      );
      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data, selectedTags: selectedTags });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  // 태그 - 드롭다운 정렬
  tagSort: async (selectedTagIds, sort) => {
    try {
      const queryString = selectedTagIds.map((id) => `id=${id}`).join("&");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/list?${queryString}&sort=${sort}`,
      );

      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  // 요일별 검색
  daySearch: async (serial_day, serial_type) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/list?day=${serial_day}&status=${serial_type}`,
      );
      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  daySort: async (serial_day, serial_type, sort) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/list?day=${serial_day}&sort=${sort}&status=${serial_type}`,
      );

      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  etcSearch: async (serial_type) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/list?status=${serial_type}`,
      );
      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },

  etcSort: async (sort, serial_type) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/webtoons/list?sort=${sort}&status=${serial_type}`,
      );

      if (!res.ok)
        throw new Error(
          "웹툰 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
        );
      const data = await res.json();

      set({ webtoons: data });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  },
}));

export default useWebtoonStore;
