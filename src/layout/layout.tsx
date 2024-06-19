import { FC, ReactNode } from "react";
import { styled } from "@mui/material";

const LayoutContainer = styled("div")({
  height: "100%",
  width: "100%",
  // maxWidth: 700,

  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-between",
  marginTop: 80,
  marginBottom: 60,
});

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
