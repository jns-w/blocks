import styled from "styled-components";

export const BaseButton = styled.button`
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.mainAccent};
  border-radius: 0.3rem;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;
