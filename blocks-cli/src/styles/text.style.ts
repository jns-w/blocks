import styled from "styled-components";


export const H1 = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: ${({theme}) => theme.fontSize.xxl};
  font-weight: 700;
`

export const H2 = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: ${({theme}) => theme.fontSize.xl};
  font-weight: 700;
`
export const H3 = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: ${({theme}) => theme.fontSize.l};
  font-weight: 600;
`

export const H4 = styled.h4`
  font-family: "Inter", sans-serif;
  font-size: ${({theme}) => theme.fontSize.m};
  font-weight: 500;
`

export const Text = styled.text`
  font-family: "Inter", sans-serif;
  font-size: ${({theme}) => theme.fontSize.l};
`