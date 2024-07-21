import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledButton = styled.button`
  height: auto;
  display: inline-block;
  font-weight: 500;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: capitalize;

  background-color: ${(props) =>
    props.variant === "primary" ? props.theme.colors.primaryPurple : props.theme.colors.bg_3};
  color: ${(props) => (props.variant === "primary" ? theme.colors.white : theme.colors.black_1)};
`;

export const StyledSelect = styled.select`
  ${(props) =>
    props.basic
      ? ``
      : `
  
  display: inline-block;
  border: none;
  overflow: hidden;
  border-radius: 6px;
  font-weight: 500;
  height: auto;
  padding: 0.8rem 2rem;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;

  color: ${props.theme.colors.black_2}
  font-family: Poppins;
  padding: 1rem;
  border: none;
  background-color: ${props.theme.colors.bg_3};

  width: 150px;
  
  `}
`;
