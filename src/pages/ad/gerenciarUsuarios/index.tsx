import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button, Text } from "@chakra-ui/react";
import {ImUserPlus} from "@react-icons/all-files/im/ImUserPlus"
import {CgUserList} from "@react-icons/all-files/cg/CgUserList"

export default function GerenciaDeUsuarios() {
  return (
    <>
      <HeaderAdmin />
            <Text marginTop={"5rem"} textAlign={"center"} fontSize={"4xl"} fontWeight="800" >
                Gerenciar Usuarios
            </Text>
            <Box mx="auto" mt={5} textAlign={"center"}  fontSize="4rem" fontWeight="bold" maxW="175vh" h="60vh"  overflowY="scroll">
                <Button margin={5} w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000"><ImUserPlus size={"3rem"}/> Add Usuario</Button>
                <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000"><CgUserList size={"3rem"}/> Listar Usuarios</Button>
            <Box marginTop={"6rem"} mx="auto"  textAlign="center" fontSize="lg" fontWeight="bold" maxW="50vh" h="20vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll" backgroundColor={"yellow.400"}>
              <Text color={"red.500"} fontSize={"2xl"} fontWeight="bold">ATENÇÃO:</Text>
              <Text>Ao adicionar um novo usuario o mesmo tera permissões para inserir e gerenciar os atendimentos dentro da plataforma IGraph.</Text>
            </Box>
            </Box>
      <Footer />
    </>
  );
}
