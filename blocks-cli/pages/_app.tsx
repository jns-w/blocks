import React from "react";
import {AppProps} from "next/app";
import {StyledThemeProvider} from "@definitions/styled-components";
import {Scrollbar} from "@components/scrollbar";
import {useWindowDimensions} from "@hooks";
import GlobalStyle from "@styles/globalStyles";
import {Wrapper} from "@components";


function MyApp({Component, pageProps}: AppProps): JSX.Element {
    const {height, width} = useWindowDimensions()
    return (
        <StyledThemeProvider>
         <GlobalStyle/>
            <Scrollbar width={width} height={height}>
              <Wrapper>
                <Component {...pageProps} />
                </Wrapper>
            </Scrollbar>
        </StyledThemeProvider>
    );
}

export default MyApp;
