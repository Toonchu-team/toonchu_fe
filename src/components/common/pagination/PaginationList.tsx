"use client";

import { ReactNode, useState } from "react";
import { Pagination, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { WebtoonData } from "../webtoonCard/type";

interface PaginationsProps {
  children: (data: WebtoonData) => ReactNode;
  data: WebtoonData[];
}

const PaginationList: React.FC<PaginationsProps> = ({ children, data }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // 한 페이지에 보여줄 개수

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex w-full flex-col items-center gap-6">
        <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-6">
          {displayedItems.map((item, index) => (
            <div key={index}>{children(item)}</div>
          ))}
        </div>

        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              fontFamily: "var(--font-nanumsquare)",
              color: "#6A6A6A",
              fontSize: { xs: "12px", md: "16px" },
              margin: "0 4px",
            },
            "& .MuiPaginationItem-root:hover": { backgroundColor: "#ffd69588" },
            "& .MuiPaginationItem-page.Mui-selected:hover": {
              backgroundColor: "#ffd69588",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#FFE7BF",
              border: "1px solid #EFC071",
            },
            "& .MuiPaginationItem-previousNext": { color: "#EFC071" },
          }}
          className="pt-4"
        />
      </div>
    </ThemeProvider>
  );
};

export default PaginationList;
