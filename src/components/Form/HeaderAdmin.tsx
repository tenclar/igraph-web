import React from "react"
import { Flex, Box, Button, Text, Divider, Popover,PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody } from "@chakra-ui/react";
import LogoOca from "../assets/oca_logo_verde.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonCircle } from "@react-icons/all-files/io5/IoPersonCircle";
import Link from "next/link";

import { getSessionUser } from "@/pages/login";


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
  marginLeft: "-10px",
};


const sessionUser = getSessionUser()


export function HeaderAdmin() {
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
            <PopoverBody textAlign="center" >
            <Text mb={1}>
              <Link href="/ad/cadastro/">Inserir novos dados</Link>
            </Text>
            <Text mb={1}>
              <Link href="/ad/cadastro/form/">Gerenciar dados</Link>
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
            <PopoverBody textAlign="center" >
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
            <PopoverBody textAlign="center" >
            <Text mb={1}>
              <Link href="/ad/gerenciarUsuarios">Gerenciar Usuarios</Link>
            </Text>
            <Text mb={1}>
              <Link href="">Gerenciar Servicos</Link>
            </Text>
            </PopoverBody>
          </PopoverContent>
          
          <Button backgroundColor={"green.400"} marginInlineStart={"auto"} color={"#fff"} onClick={() => window.location.href = "/autenticate"}>
            <IoPersonCircle color="#fff" size={25} />{" "}
            {sessionUser?.nickname || "" } 
            
          </Button>        
          </Popover>
      </Flex>
      <Divider my={4} />
    </Box>
  );
}
