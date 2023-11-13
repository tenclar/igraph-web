import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button, Text } from "@chakra-ui/react";
import {ImUserPlus} from "@react-icons/all-files/im/ImUserPlus"
import {CgUserList} from "@react-icons/all-files/cg/CgUserList"

export default function GerenciaDeUsuarios() {
  return (
    <>
      <HeaderAdmin />
            <Text marginTop={"5rem"} textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>
                Gerenciar Usuarios
            </Text>
            <Box mx="auto" mt={5} textAlign={"center"}  fontSize="4rem" fontWeight="bold" maxW="175vh" h="60vh"  overflowY="scroll">
                <Button w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000"><ImUserPlus size={"3rem"}/> Add Usuario</Button>
                <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000"><CgUserList size={"3rem"}/> Listar Usuarios</Button>
            </Box>
      <Footer />
    </>
  );
}
