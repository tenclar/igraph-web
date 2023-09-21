import { Flex, Text, Divider, Box, Select, Button, Image } from "@chakra-ui/react"
import { auto } from "@popperjs/core"
import { extendTheme } from "@chakra-ui/react";
import LogoOca from "../assets/oca_logo_verde.png"
import {IoMdArrowDropdown} from "react-icons/io"

export const  header = extendTheme({
    colors: {
        HeaderButton:{
            gray:"#a0a0a0",
        },
    }
})
const imageStyles = {
    width: "100px", 
    height: "60px", 
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
                mx={auto}
                px={6}
                align={"center"}>

                <Box style={logoStyles}>
                    <Image src={LogoOca.src} alt="LogoOca" style={imageStyles} />
                </Box>

                <Box >
                    <Button colorScheme="HeaderButon" color="#000000" fontSize={20} fontWeight="800">
                        Dados <IoMdArrowDropdown/>
                    </Button>  
                </Box>
                <Box >
                    <Button colorScheme="HeaderButon"  color="#000000" fontSize={20} fontWeight="800">
                        Relatorio <IoMdArrowDropdown/>
                    </Button >  
                </Box>
                <Box>
                    <Button colorScheme="HeaderButon"  color="#000000" fontSize={20} fontWeight="800">
                        Configurações <IoMdArrowDropdown/>
                    </Button>  
                </Box>
            </Flex>
            <Divider my={4} />
        </Box>
    )
}