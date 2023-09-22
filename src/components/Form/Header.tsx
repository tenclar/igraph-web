import React from "react";
import { Flex, Box, Button,Text,Divider, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Link } from "@chakra-ui/react";
import LogoOca from "../assets/oca_logo_verde.png";
import { IoMdArrowDropdown } from "react-icons/io";

const imageStyles = {
  width: "80px",
  height: "45px",
};

const logoStyles = {
  marginLeft: "-40px",
};

export function Header() {
  return (
    <Box bg="#bdbebd" border="green">
      <Flex
        as="header"
        w={"100%"}
        gap={16}
        maxWidth={1480}
        h={16}
        mx="auto"
        px={6}
        align="center"
      >
        <Box style={logoStyles}>
          <img src={LogoOca.src} alt="LogoOca" style={imageStyles} />
        </Box>
        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="HeaderButon"
              color="#000000"
              fontSize={20}
              fontWeight="800"
            >
              Dados <IoMdArrowDropdown />
            </Button>
          </PopoverTrigger>
          <PopoverContent boxSize={"auto"}>
            <PopoverArrow />
            <PopoverBody align="center" >
            <Text mb={1}>
              <Link href="">Inserir novos dados</Link>
            </Text>
            <Text mb={1}>
              <Link href="">Gerenciar dados</Link>
            </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="HeaderButon"
              color="#000000"
              fontSize={20}
              fontWeight="800"
            >
              Relatório <IoMdArrowDropdown />
            </Button>
          </PopoverTrigger>
          <PopoverContent boxSize={"auto"}>
            <PopoverArrow />
            <PopoverBody align="center" >
            <Text mb={1}>
              <Link href="">Gerar Planilha</Link>
            </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="HeaderButon"
              color="#000000"
              fontSize={20}
              fontWeight="800"
            >
              Configurações <IoMdArrowDropdown />
            </Button>
          </PopoverTrigger>
          <PopoverContent boxSize={"auto"}>
            <PopoverArrow />
            <PopoverBody align="center" >
            <Text mb={1}>
              <Link href="">Gerenciar Usuarios</Link>
            </Text>
            <Text mb={1}>
              <Link href="">Gerenciar Servicos</Link>
            </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Divider my={4} />
    </Box>
  );
}
