/* eslint-disable react/display-name */
import React from 'react';

import { StyledSelect } from './styles';

export const Select = React.forwardRef(
  ({ children, variant, id, ...props }, ref) => {
    return (
      <StyledSelect id={id} variant={variant} ref={ref} {...props}>
        {children}
      </StyledSelect>
    );
  },
);
