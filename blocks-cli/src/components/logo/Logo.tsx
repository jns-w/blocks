import React from "react";
import styled from "styled-components";

import {faCubes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useRouter} from "next/router";

export const Logo: React.FC = () => {
    const router = useRouter()

    return (
            <Wrapper onClick={()=>router.push('/')}>
                <Container>
                    <FontAwesomeIcon icon={faCubes} style={{fontSize: 35}}/>
                </Container>
            </Wrapper>

            );
};

const Wrapper = styled.div`
color: ${({theme}) => theme.color.textColor};
                           transition: all 200ms linear 0s;
                           user-select: none;
`

const Container = styled.div`
cursor: pointer;
`