import { Footer } from "@/components/Form/Footer";
import { useState, useEffect } from "react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import api from "@/services/api";
import { Servico } from "@/components/CriacaoDashboard/interfaces/ServicosInterface";


export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Servico[]>([]);


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get<Servico[]>("/servicos");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de servicos:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#f0f0f0" : "#ffffff";
  };


  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"3xl"} fontWeight="800">
        Servicos do iGraph2
      </Text>
      <Box
        mx="auto"
        mt={5}
        textAlign={"center"}
        fontSize="lg"
        border="0.225rem solid #000000"
        borderRadius="md"
        overflowY={"scroll"}
        maxW="60vw"
        maxH={"60vh"}
      >
        <Table variant="simple">
          <Thead>
            <Tr textAlign={"center"} backgroundColor={"black"}>
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>
                Usuário
              </Th>
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>
                Opções
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario, index) => (
              <Tr key={usuario.id} backgroundColor={getRowColor(index)}>
                <Td textAlign={"center"}>{usuario.nome}</Td>
                <Td textAlign={"center"}>
                  <Button
                    backgroundColor={"blue.400"}
                    margin={"0.3rem"}
                    w={40}
                  >
                    Editar
                  </Button>
                  <Button
                    backgroundColor={"red.400"}
                    margin={"0.3rem"}
                    w={40}
                  >
                    Deletar
                  </Button>          
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Footer />
    </>
  );
}
