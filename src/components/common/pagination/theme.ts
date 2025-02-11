import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // 모바일
      sm: 600, // 기존 small
      md: 769, // 새로운 breakpoint 추가!
      lg: 900, // 기존 medium
      xl: 1200, // 기존 large
    },
  },
});

export default theme;
