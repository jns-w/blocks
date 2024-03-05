import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useTheme} from "@definitions/styled-components";
import {faAdjust} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const ThemeToggle: React.FC = () => {
    const {toggleTheme, themeName} = useTheme()

    return (
        <Wrapper>
            <Container themeName={themeName} onClick={() => toggleTheme()}>
                <FontAwesomeIcon icon={faAdjust} style={{fontSize: 20}}/>
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  color: ${({theme}) => theme.color.textColor};
  transition: color 200ms linear 0s;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
`

const Container = styled.div<{ themeName: string }>`
  cursor: pointer;
`

