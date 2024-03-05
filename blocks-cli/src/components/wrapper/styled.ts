import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({theme}) => theme.color.background};
  color: ${({theme}) => theme.color.textColor};
  transition: background-color 100ms ease 0s;
`;
