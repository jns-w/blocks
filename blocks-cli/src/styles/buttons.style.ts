import styled, {css} from 'styled-components'


export const Button = styled.button`
  width: 100%;
  padding: 10px 12px;
  border-radius: 7px;
  border: 1px solid #15171a;
  color: ${({theme}) => theme.color.white};
  background: ${({theme}) => theme.color.blackGrey};
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
`

export const GradientBG = css`
  background: linear-gradient(125deg, #f32f7d, #7016d0);
`