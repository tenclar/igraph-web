import { Footer } from "@/components/Form/Footer";
import { useState, useEffect } from "react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
} from "@chakra-ui/react";
import api from "@/services/api";
import EditarPerfilModal from "../ModalUsuarios/EditPerfilModal";
import EditarLoginModal from "../ModalUsuarios/EditLoginModal";
import { UsuarioData } from "@/components/Interfaces/UsuarioInterface";

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioData[]>([]);
  const [isEditarPerfilModalOpen, setIsEditarPerfilModalOpen] = useState(false);
  const [isEditarLoginModalOpen, setIsEditarLoginModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsuarioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<UsuarioData[]>("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de usuários:", error);
        alert("Não foi possível carregar os usuários. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const getRowColor = (index: number) => (index % 2 === 0 ? "#f0f0f0" : "#ffffff");

  const handleOpenModal = (user: UsuarioData, modalType: "perfil" | "login") => {
    if (modalType === "perfil") {
      setSelectedUser(user);
      setIsEditarPerfilModalOpen(true);
    } else {
      setSelectedUser(user);
      setIsEditarLoginModalOpen(true);
    }
  };

  const handleCloseModal = (modalType: "perfil" | "login") => {
    if (modalType === "perfil") {
      setIsEditarPerfilModalOpen(false);
    } else {
      setIsEditarLoginModalOpen(false);
    }
    setSelectedUser(null);
  };

  const handleSalvarEdicao = (editedUser: UsuarioData) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    handleCloseModal("perfil");
  };

  const handleSalvarLoginEdicao = (editedLogin: UsuarioData) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === editedLogin.id ? editedLogin : u))
    );
    handleCloseModal("login");
  };

  const handleDesativarClick = async (usuarioId: number, status: boolean) => {
    try {
      const novoStatus = !status; // Alternar o valor booleano
      await api.put(`/usuarios/${usuarioId}`, { status: novoStatus });
  
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((u) =>
          u.id === usuarioId ? { ...u, status: novoStatus } : u
        )
      );
    } catch (error) {
      console.error("Erro ao alterar status do usuário:", error);
      alert("Não foi possível alterar o status do usuário.");
    }
  };  

  return (
    <>
      <HeaderAdmin />
      <Text marginTop="5rem" textAlign="center" fontSize="3xl" fontWeight="800">
        Usuários do iGraph2
      </Text>
      <Box
        mx="auto"
        mt={5}
        textAlign="center"
        fontSize="lg"
        border="0.225rem solid #000000"
        borderRadius="md"
        overflowY="auto"
        maxW="90vw"
        maxH="70vh"
        p={4}
      >
        {isLoading ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr backgroundColor="black">
                <Th fontSize="1rem" color="white" textAlign="center">
                  Usuário
                </Th>
                <Th fontSize="1rem" color="white" textAlign="center">
                  Opções
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {usuarios.map((usuario, index) => (
                <Tr key={usuario.id} backgroundColor={getRowColor(index)}>
                  <Td textAlign="center">{usuario.nome}</Td>
                  <Td textAlign="center">
                    <Button
                      backgroundColor="yellow.400"
                      m="0.3rem"
                      w={40}
                      onClick={() => handleOpenModal(usuario, "perfil")}
                    >
                      Perfil
                    </Button>
                    <Button
                      backgroundColor="green.400"
                      m="0.3rem"
                      w={40}
                      onClick={() => handleOpenModal(usuario, "login")}
                    >
                      Login
                    </Button>
                    <Button
                      backgroundColor={
                        usuario.status ===  false? "red.500" : "blue.500"
                      }
                      w={40}
                      m="0.3rem"
                      onClick={() =>
                        handleDesativarClick(usuario.id, usuario.status)
                      }
                    >
                      {usuario.status === true? "Desativar" : "Ativar"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {isEditarPerfilModalOpen && selectedUser && (
        <EditarPerfilModal
          isOpen={isEditarPerfilModalOpen}
          onClose={() => handleCloseModal("perfil")}
          user={selectedUser}
          onSave={handleSalvarEdicao}
        />
      )}

      {isEditarLoginModalOpen && selectedUser && (
        <EditarLoginModal
          isOpen={isEditarLoginModalOpen}
          onClose={() => handleCloseModal("login")}
          user={selectedUser}
          onSave={handleSalvarLoginEdicao}
        />
      )}
    </>
  );
}