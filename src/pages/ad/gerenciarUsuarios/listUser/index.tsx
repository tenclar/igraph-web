import { Footer } from "@/components/Form/Footer";
import { useState, useEffect } from 'react';
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react"
import api from "@/services/api";

interface User {
  nome: string;
}

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Fazendo a solicitação para obter a lista de usuários
        const response = await api.get<User[]>("/usuarios"); // Certifique-se de ajustar o caminho correto

        // Atualizando o estado com os usuários obtidos
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de usuários:', error);
      }
    };

    // Chamando a função de busca ao montar o componente
    fetchUsuarios();
  }, []);

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#f0f0f0" : "#ffffff";
  };

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"3xl"} fontWeight="800">
        Usuários do Igraph
      </Text>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="lg"   border=".125rem solid #000000" borderRadius="md" overflowY={"scroll"} maxW="60vw">
        <Table variant="simple">
          <Thead>
            <Tr textAlign={"center"} backgroundColor={"black"}  >
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>Usuário</Th>
              <Th  fontSize={"1rem"} color={"#fff"} textAlign={"center"}>Opções</Th>     
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario, index) => (
              <Tr key={usuario.nome} backgroundColor={getRowColor(index)}>
                <Td textAlign={"center"}>{usuario.nome}</Td>
                <Td textAlign={"center"}><Button>test</Button> <Button>Teste2</Button><Button>Test3</Button></Td>
                
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Footer />
    </>
  );
}
