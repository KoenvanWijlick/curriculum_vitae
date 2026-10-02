"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "system-ui, sans-serif",
  headings: {
    fontFamily: "system-ui, sans-serif",
    fontWeight: "700",
  },
  primaryColor: "blue",
  defaultRadius: "md",
  components: {
    Paper: {
      defaultProps: {
        shadow: "sm",
        radius: "md",
        p: "md",
      },
    },
  },
});
