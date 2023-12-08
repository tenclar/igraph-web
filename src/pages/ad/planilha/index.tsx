import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";



export default function GerarPlanilha() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"4xl"} fontWeight="800">
         Planilha Igraph2
      </Text>
        <Box marginTop={"1rem"} mx="auto"  textAlign="center" fontSize="lg" fontWeight="bold" maxW="50vh" h="20vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll" backgroundColor={"gray.400"}>
              <Text color={"#fff"} fontSize={"2xl"} fontWeight="bold">Dica:</Text>
              <Text color={"#fff"}>Selecione um periodo de tempo e escolha os tipos de atendimentos que seram gereados na planilha do IGraph2.</Text>
          </Box>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="4rem" fontWeight="bold" maxW="175vh" h="60vh" overflowY="scroll">
        <Button margin={5} w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000" onClick={onOpen}>
           Gerar Plainha
        </Button>
        <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000" onClick={() => window.location.href = "/ad/gerenciarUsuarios/listUser"} >
           Visualizar Planilha
        </Button>
        
      </Box>
      <Footer />
    </>
  );
}
