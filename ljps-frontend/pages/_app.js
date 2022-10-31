import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import "bootstrap-icons/font/bootstrap-icons.css";
//import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import NavBarModal from "../components/NavbarComponent/NavbarModal"

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous"/>
      </Head>

      <NavBarModal></NavBarModal>
      <Component {...pageProps} />

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
        crossOrigin="anonymous"
      ></Script>
    </>
  );
}

export default MyApp;
