import React from "react";

import { StyledButton } from "./styles";

function Button({ type, variant = "primary", children, ...props }) {
  return (
    <StyledButton data-testid="modal-btn" type={type === "submit" ? "submit" : "button"} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
