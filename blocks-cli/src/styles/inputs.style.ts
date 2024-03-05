import styled from "styled-components";


export const InputsWithLabel = styled.div`
  display: grid;
  width: 100%;

  div {
    label {
      display: inline-block;
      font-family: "Inter", sans-serif;
      font-weight: 700;
      font-size: 12.5px;
      margin: 0 0 5px 0;
      color: ${({theme}) => theme.color.textColor}
    }
  }
`

export const InputBasic = styled.input`
  padding: 15px 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: ${({theme}) => theme.color.inputBg};
  color: ${({theme}) => theme.color.textColor};
  font-family: "Inter", sans-serif;
  border: ${({theme}) => theme.color.inputOutline} 1px solid;
  border-radius: 10px;
  font-size: 16px;
`