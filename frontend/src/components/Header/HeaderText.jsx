import React from "react";
import { StyledHeaderText } from "./styles";

function HeaderText({ children, ...props }) {
  return <StyledHeaderText {...props}>{children}</StyledHeaderText>;
}

export default HeaderText;
