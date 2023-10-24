import { useEffect, useState } from "react";
import api from "@/services/api";
import { Text, VStack, Box } from "@chakra-ui/react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { format } from "date-fns";
import { Footer } from "@/components/Form/Footer";

export default function FormDados() {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const response = await api.get("/atendimentos");
        setAtendimentos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAtendimentos();
  }, []);

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"2.3rem"} fontWeight={"800"}>
        Lista de Atendimentos
      </Text>
      <Box
        margin={"AUTO"}
        marginTop={"3rem"}
        textAlign={"center"}
        fontSize={"1.5rem"}
        fontWeight={"800"}
        w="600px" // Largura do container
        h="400px" // Altura do container
        borderWidth="5px"
        borderRadius="md"
        overflowY="scroll" // Adicione a barra de rolagem vertical
      >
        <VStack spacing={4} padding={4}>
          {atendimentos.map((atendimento) => (
            <Box key={atendimento.id}>
              <Text>
                {`Data: ${format(new Date(atendimento.data_de_atendimento), "dd/MM/yyyy")}, Quantidade: ${atendimento.quantidade}`}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Footer/>
    </>
  );
}
