import styled from "styled-components";

export const NoTask = styled.p`
  font-weight: 500;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray_2};
  width: max-content;
  height: auto;
  color: ${(props) => props.theme.colors.black_2};
  text-align: center;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
`;

export const List = styled.div`
  padding: 1rem;
  background: ${(props) => props.theme.colors.bg_2};
`;
