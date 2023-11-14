import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Stack,
    Select, // Importando o componente Select
  } from "@chakra-ui/react";
  import { UsuarioData } from "@/components/CriacaoDashboard/interfaces/UsuarioInterface";
  import api from "@/services/api";
import React ,{ useState } from "react";
  
  interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
    const [newUserData, setNewUserData] = useState<UsuarioData>({
      id: 0,
      nome: "",
      password: "",
      email: "",
      nickname: "",
      nivel: 0,
      status: 0,
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewUserData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleAddUser = async () => {
      try {
        // Convertendo o nível de acesso e o status conforme as especificações
        const nivelAcessoValue =
          newUserData.nivelAcesso === "Administrador" ? 1 : 0;
        const statusValue = newUserData.status === "Ativo" ? 1 : 0;
  
        // Criando um novo objeto com os dados convertidos
        const userDataToSend: UsuarioData = {
          id: 0,
          nome: newUserData.nome,
          password: newUserData.password,
          email: newUserData.email,
          nickname: newUserData.nickname,
          nivel: nivelAcessoValue,
          status: statusValue,
        };
  
        // Enviando os dados para a rota /usuarios
        const response = await api.post("/usuarios", userDataToSend);
  
        // Lógica adicional, se necessário...
  
        console.log("Dados enviados com sucesso:", response.data);
  
        // Feche o modal após adicionar o usuário
        onClose();
      } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        // Lógica adicional para lidar com o erro, se necessário...
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Novo Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Nome"
                name="nome"
                value={newUserData.nome}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Nome de Usuário"
                name="nickname"
                value={newUserData.nickname}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Senha"
                type="password"
                name="senha"
                value={newUserData.password}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Confirmar Senha"
                type="password"
                name="confirm"
                value={newUserData.confirm}
                onChange={handleInputChange}
              />
              {/* Selector para Nível de Acesso */}
              <Select
                placeholder="Selecione o Nível de Acesso"
                name="nivelAcesso"
                value={newUserData.nivelAcesso}
                onChange={handleInputChange}
              >
                <option value="Administrador">Administrador</option>
                <option value="Colaborador">Colaborador</option>
              </Select>
              {/* Selector para Status */}
              <Select
                placeholder="Selecione o Status"
                name="status"
                value={newUserData.status}
                onChange={handleInputChange}
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </Select>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleAddUser}>
              Adicionar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default AddUserModal;
  