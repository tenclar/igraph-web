import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Footer } from "@/components/Form/Footer";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { MdPlaylistAdd, MdOutlinePlaylistPlay } from "react-icons/md";
import AddServicoModal from "./ModalServicos/AddServicoModal";

export default function gerenciarServicos() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return(
<>

      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"4xl"} fontWeight="800">
        Gerenciar Serviços
      </Text>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="4rem" fontWeight="bold" maxW="175vh" h="60vh" overflowY="scroll">
        <Button margin={5} w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000" onClick={onOpen}>
        <MdPlaylistAdd size={"3rem"} />Add Serviços
        </Button>
        <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000" onClick={() => window.location.href = "/ad/gerenciarServicos/listServicos"} >
        <MdOutlinePlaylistPlay size={"3rem"} /> Listar Serviços
        </Button>
        <AddServicoModal isOpen={isOpen} onClose={onClose}/>
        <Box marginTop={"6rem"} mx="auto"  textAlign="center" fontSize="lg" fontWeight="bold" maxW="50vh" h="20vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll" backgroundColor={"yellow.400"}>
              <Text color={"red.500"} fontSize={"2xl"} fontWeight="bold">ATENÇÃO:</Text>
              <Text>Ao adicionar um serviço novo no Igraph o mesmo poderar ter atendimentos cadastrados nele</Text>
          </Box>
      </Box>
      
</>

  )
}
  
