import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Footer } from "@/components/Form/Footer";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { BsFillHousesFill, BsFillHouseFill } from "react-icons/bs";

export default function gerenciarServicos() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return(
<>

      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"4xl"} fontWeight="800">
        Gerenciar Planilhas
      </Text>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="4rem" fontWeight="bold" maxW="175vh" h="60vh" overflowY="scroll">
        <Button margin={5} w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000" onClick={() => window.location.href = "/ad/planilha/vizualizarGeral"}>
        <BsFillHousesFill size={"3rem"} />Todas as Centrais
        </Button>
        <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000" onClick={() => window.location.href = "/ad/planilha/vizualizarPlanilha"} >
        <BsFillHouseFill size={"3rem"} /> Filtrar Central
        </Button>
        <Box marginTop={"6rem"} mx="auto"  textAlign="center" fontSize="lg" fontWeight="bold" maxW="50vh" h="20vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll" backgroundColor={"yellow.400"}>
              <Text color={"red.500"} fontSize={"2xl"} fontWeight="bold">ATENÇÃO:</Text>
              <Text>Selecione uam opção de qual tipo de atendimento você deseja buscar na planilha</Text>
          </Box>
      </Box>
     
</>

  )
}
  
