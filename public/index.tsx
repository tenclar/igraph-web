import Head from "next/head";
import React from "react";
import { Box, Container} from "@chakra-ui/react"; 
import { Header } from "@/components/Form/Header";
import { Footer } from "@/components/Form/Footer";

const HTMLComponent: React.FC = () => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>!Graph2</title>
      </Head>
      <Container>
        
        <Box id="root">
          
        </Box>
      </Container>
    </html>
  );
};

export default HTMLComponent;
