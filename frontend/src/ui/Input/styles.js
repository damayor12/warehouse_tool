import styled from "styled-components";

export const StyledInput = styled.input`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: ${(props) => props.theme.colors.white};
  font-size: 1.6rem;
`;

export const StyledSelect = styled.select`
  ${(props) =>
    props.variant === "basic"
      ? `
      margin-top: 0.5rem;
      margin-bottom: 2rem;
      width: 100%;
      padding: 1rem;
      border: none;
      background-color: ${(props) => props.theme.colors.white};
      font-size: 1.6rem;
      `
      : `
  display: inline-block;
  height: auto;
  font-size: 1.6rem;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
  overflow: hidden;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 500;
  

  color: ${(props) => props.theme.colors.black_2};
  font-family: Poppins;
  padding: 1rem;
  background: ${(props) => props.theme.colors.bg_3};
  width: 150px;
  
  `}
`;
