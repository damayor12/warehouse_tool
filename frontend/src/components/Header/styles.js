import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;

export const StyledHeaderText = styled.p`
  display: inline-block;
  width: 100%;
  font-family: "Poppins";
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.black_1};
`;
