import React from "react";

import {Header, Main, Footer} from "@components";
import {Helmet} from "react-helmet"

const Home = () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
        <script src='http://joeiddon.github.io/perlin/perlin.js'></script>
      </Helmet>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
};

export default Home;