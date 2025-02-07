import { ReactNode, useState } from "react";
import { Pagination, ThemeProvider } from "@mui/material";
import theme from "./theme";

interface PaginationsProps {
  children: ReactNode;
}

// ✅ 더미 데이터 (1920개의 아이템)
const allItems = Array.from({ length: 1920 }, (_, i) => `Item ${i + 1}`);

const PaginationList: React.FC<PaginationsProps> = ({ children }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 보여줄 개수

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = allItems.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* 현재 페이지의 데이터 렌더링 */}
      {displayedItems.map((item, index) => (
        <div key={index}>
          {item}
          {children}
        </div>
      ))}

      {/* ✅ 페이지네이션 UI */}
      <Pagination
        count={Math.ceil(allItems.length / itemsPerPage)} // 전체 페이지 개수
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
