import React from "react"
import Head from 'next/head';

const Layout = ({ children }) => (
  <div>
    <Head>
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
    />
    </Head>
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto"
      }}
    >
      {children}
    </div>
  </div>
)

export default Layout;
