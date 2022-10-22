import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import "bootstrap-icons/font/bootstrap-icons.css";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous"/>

      </Head>

      {/* Navbar here */}
      <nav class="navbar navbar-expand-lg navbar-light bg-white m-3">
        <a class="navbar-brand" href="/learning-journey"> <h4>All-in-One LJPS</h4> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/learning-journey"> <strong>Create Learning Journey</strong></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/learning-journey/view"> <strong> View Learning Journey </strong></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
        </div>
      </nav>

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
