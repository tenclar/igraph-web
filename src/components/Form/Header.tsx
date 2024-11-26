import React from "react"
import { Flex, Box, Button, Text, Divider, Popover,PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody} from "@chakra-ui/react";
import LogoOca from "../assets/oca_logo_verde.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link";


const headerStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: "#bdbebd",
  border: "2px solid green",
  zIndex: 1, // Coloque o header acima de outros elementos
};

const imageStyles = {
  width: "80px",
  height: "45px",
};

const logoStyles = {
  margin: "auto",
};


export function Header() {
  return (
    <Box>
      <Flex
        as="header"
        w={"100%"}
        gap={16}
        maxWidth={"100%"}
        h={20}
        mx="auto"
        px={6}
        align="center"
        sx={headerStyles}
        >
        <Box style={logoStyles}>
          <img src={LogoOca.src} alt="LogoOca" style={imageStyles} />
        </Box>
        <Button backgroundColor={"green.400"}>
          <Link href="/login/" style={{textDecoration:"none"}}>Entrar</Link>
        </Button>
        </Flex>
    </Box>
  );
}
