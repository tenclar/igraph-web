import React from "react";
import { Flex, Text, Divider, Box, Select, Button, Image } from "@chakra-ui/react";
import LogoSead from "../assets/logoHorizontal.png"; 

export function Footer() {
  const footerStyles = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#bdbebd",
    color: "#000000",
    padding: "16px",
    borderTop: "3px solid green"
  };

  const imageStyles = {
    width: "200px", 
    height: "60px", 
  };

 

  return (
    <Box style={footerStyles}>
      <Flex
        w={"100%"}
        gap={18}
        maxWidth={1480}
        h={14}
        mx="auto"
        px={4}
        align="center"
        justify="center" // Centralize horizontalmente
      >
        <Image
          src={LogoSead.src}
          alt="Logo SEAD"
          style={imageStyles}
        />
      </Flex>
    </Box>
  );
}
