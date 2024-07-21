import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bg_2};
  max-width: 500px;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  width: 100%;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
`;
