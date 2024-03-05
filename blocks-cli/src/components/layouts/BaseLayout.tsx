import React from 'react';
import {Scrollbar} from "@/components/scrollbar";
import {StyledThemeProvider} from "@/definitions/styled-components";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {Wrapper} from "@/components";
import GlobalStyle from "@/styles/globalStyles";
import {useWindowDimensions} from "@hooks";


export const BaseLayout: React.FC<React.PropsWithChildren<any>> = ({children}) => {
  const {height, width} = useWindowDimensions()

  return (
    <>
      <GlobalStyle/>
      <HelmetProvider>
        <Helmet>
          <title>Blocks</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          {/*@ts-ignore*/}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,700&display=swap"
            rel="stylesheet"/>
        </Helmet>
        <StyledThemeProvider>
          <Scrollbar width={width} height={height}>
            <Wrapper>
              {children}
            </Wrapper>
          </Scrollbar>
        </StyledThemeProvider>
      </HelmetProvider>
    </>
  );
}
