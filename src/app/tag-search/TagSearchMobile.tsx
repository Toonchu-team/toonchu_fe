import PaginationList from "@/components/common/pagination/PaginationList";
import SearchBarMobile from "@/components/common/searchBar/SearchBarMobile";
import Tags from "@/components/common/tag/Tags";
import WebtoonCardMobile from "@/components/common/webtoonCard/WebtoonCardMobile";
import clsx from "clsx";

export default function TagSearchMobile() {
  const selectedTags = [
    "오컬트판타지",
    "동양",
    "크리처",
    "스릴러",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
    "현대물",
  ];

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-10 pb-12 pt-5",
        "px-mobile",
      )}
    >
      {/* 제목 */}
      <p className="text-lg font-bold">태그별 검색</p>

      <div className="flex flex-col items-center gap-5">
        {/* 검색창 */}
        <SearchBarMobile />

        {/* 선택한 태그 */}
        {/* 검색 요청에서 받아와야 할 것 같음 */}
        <div
          className={clsx(
            "flex h-[100px] origin-top scale-[60%] flex-wrap justify-center gap-3 overflow-y-auto",
          )}
        >
          <button className="h-[34px] rounded-lg border border-main-grey bg-bg-yellow-02 px-2 py-1 text-main-text hover:bg-bg-yellow-01">
            선택한 태그 초기화
          </button>
          {selectedTags.map((selectedTag, idx) => {
            return (
              <div key={idx}>
                <Tags tag={selectedTag} />
              </div>
            );
          })}
        </div>

        {/* 검색 결과 - 카드 컴포넌트 */}
        <div className={clsx("flex flex-col items-center gap-x-10 gap-y-7")}>
          <PaginationList>
            <WebtoonCardMobile />
          </PaginationList>
        </div>
      </div>
    </div>
  );
}
