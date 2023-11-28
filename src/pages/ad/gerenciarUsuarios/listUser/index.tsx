import { Footer } from "@/components/Form/Footer";
import { useState, useEffect } from 'react';
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import api from "@/services/api";
import EditarPerfilModal from "./EditPerfilModal";
import EditarLoginModal from "./EditLoginModal";


interface User {
  id: number;
  nome: string;
  nickname: string
  password: string;
  nivel: number;
  status: string;
}


export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [isEditarPerfilModalOpen, setIsEditarPerfilModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditarLoginModalOpen, setIsEditarLoginModalOpen] = useState(false);
  const [selectedLoginUser, setSelectedLoginUser] = useState<User | null>(null);



  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get<User[]>("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#f0f0f0" : "#ffffff";
  };

  const handlePerfilClick = (user: User) => {
    setSelectedUser(user);
    setIsEditarPerfilModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditarPerfilModalOpen(false);
  };

  const handleSalvarEdicao = (editedUser: User) => {
    // Implemente a lógica para salvar as alterações do usuário na API
    console.log("Salvando alterações:", editedUser);
    // Atualize a lista de usuários (opcional, dependendo da sua lógica)
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    // Feche o modal
    setIsEditarPerfilModalOpen(false);
  };

  const handleLoginClick = (login: User) => {
    setSelectedLoginUser(login);
    setIsEditarLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsEditarLoginModalOpen(false);
  }


  const handleSalvarLoginEdicao = (editedLogin: User) => {
    // Implemente a lógica para salvar as alterações do usuário na API
    console.log("Salvando alterações de login:", editedLogin);
    // Atualize a lista de usuários (opcional, dependendo da sua lógica)
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === editedLogin.id ? editedLogin : u))
    );
    // Feche o modal
    setIsEditarLoginModalOpen(false);
  };
  

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"3xl"} fontWeight="800">
        Usuários do iGraph2
      </Text>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="lg" border="0.225rem solid #000000" borderRadius="md" overflowY={"scroll"} maxW="60vw" maxH={"60vh"}>
        <Table variant="simple">
          <Thead>
            <Tr textAlign={"center"} backgroundColor={"black"} >
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>Usuário</Th>
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>Opções</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usuarios.map((usuario, index) => (
              <Tr key={usuario.id} backgroundColor={getRowColor(index)}>
                <Td textAlign={"center"}>{usuario.nome}</Td>
                <Td textAlign={"center"}>
                  <Button backgroundColor={"yellow.400"} margin={"0.3rem"} w={40} onClick={() => handlePerfilClick(usuario)}>
                    Perfil
                  </Button>
                  <Button backgroundColor={"green.400"} margin={"0.3rem"} w={40} onClick={() => handleLoginClick(usuario)}>
                    Login
                  </Button>
                  <Button backgroundColor={"red.500"} w={40} margin={"0.3rem"}>
                    Desativar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Footer />
  
      {/* Renderize o modal de edição de perfil se estiver aberto */}
      {isEditarPerfilModalOpen && selectedUser && (
        <EditarPerfilModal isOpen={isEditarPerfilModalOpen} onClose={handleCloseModal} user={selectedUser} onSave={handleSalvarEdicao} />
      )}
  
      {/* Renderize o modal de edição de login se estiver aberto */}
      {isEditarLoginModalOpen && selectedLoginUser && (
        <EditarLoginModal isOpen={isEditarLoginModalOpen} onClose={handleCloseLoginModal} user={selectedLoginUser} onSave={handleSalvarLoginEdicao} />
      )}
    </>
  );  
}
