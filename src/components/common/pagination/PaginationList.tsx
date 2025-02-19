"use client";

import { ReactNode, useState } from "react";
import { Pagination, ThemeProvider } from "@mui/material";
import theme from "./theme";

interface PaginationsProps {
  children: ReactNode; // children으로 컴포넌트 받을 예정
}

// ✅ 더미 데이터 (1920개의 아이템)
const allItems = Array.from({ length: 1920 }, (_, i) => `Item ${i + 1}`);

const PaginationList: React.FC<PaginationsProps> = ({ children }) => {
  const [page, setPage] = useState(1); // 현재 페이지
  const itemsPerPage = 8; // 한 페이지에 보여줄 개수

  // 더미데이터가 현재 배열이므로 인덱스 사용
  // 페이지 1 → startIndex = 0, endIndex = 8 → Item 1 ~ Item 8
  // 페이지 2 → startIndex = 8, endIndex = 16 → Item 9 ~ Item 16
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = allItems.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // 클릭된 페이지를 현재 페이지로 업데이트
  };

  return (
    <ThemeProvider theme={theme}>
      {/* 현재 페이지의 데이터 렌더링 */}
      {displayedItems.map((item, index) => (
        <div key={index}>
          {item} {/* 임시 */}
          {children}
        </div>
      ))}

      {/* ✅ 페이지네이션 UI */}
      <Pagination
        count={Math.ceil(allItems.length / itemsPerPage)} // 전체 페이지 개수 (전체 아이템 / 페이지 당 아이템)
        page={page}
        onChange={handleChange}
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: "var(--font-nanumsquare)",
            color: "#6A6A6A", // 기본 페이지 텍스트 색상: main-text
            fontSize: { xs: "12px", md: "16px" },
            margin: "0 2px",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#ffd69588", // bg-yellow-1에 투명도 적용
          },
          "& .MuiPaginationItem-page.Mui-selected:hover": {
            backgroundColor: "#ffd69588",
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#FFE7BF", // bg-yellow-2
            border: "1px solid #EFC071", // main-yellow
          }, // 선택된 페이지 색상
          "& .MuiPaginationItem-previousNext": { color: "#EFC071" }, // 이전/다음 버튼 색상
        }}
        className="pt-4"
      />
    </ThemeProvider>
  );
};

export default PaginationList;
