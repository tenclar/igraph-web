import Head from "next/head";
import React from "react";
import { Header } from "@/components/Form/Header";
import { Footer } from "@/components/Form/Footer";

const HTMLComponent: React.FC = () => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Igraph-web</title>
      </Head>
      <body>
        <div id="root">
          <Header /> {/* Renderize o componente Header aqui */}
        </div>
      </body>
    </html>
  );
};

export default HTMLComponent;
