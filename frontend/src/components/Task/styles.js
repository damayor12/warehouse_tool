import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.white};
  margin-bottom: 1.5rem;
  border-radius: 4px;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ActionBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & > div {
    font-size: 2rem;
    background-color: ${(props) => props.theme.colors.gray_1};
    color: ${(props) => props.theme.colors.black_2};
    align-items: center;
    padding: 0.5rem;
    border-radius: 4px;
    display: flex;

    justify-content: center;
    cursor: pointer;
  }
`;

export const Box = styled.div``;
