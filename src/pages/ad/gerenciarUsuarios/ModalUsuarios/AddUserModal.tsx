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
  Select,
} from "@chakra-ui/react";
import { UsuarioData } from "@/components/Interfaces/UsuarioInterface";
import api from "@/services/api";
import React, { useState } from "react";

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
    nivel: false,
    status: false,
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "confirm") {
      setConfirmPassword(value);
    } else {
      setNewUserData((prev) => ({
        ...prev,
        [name]: name === "nivel" || name === "status" ? value === "true" : value,
      }));
    }
  };

  const handleAddUser = async () => {
    try {
      if (newUserData.password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      const userDataToSend: UsuarioData = {
        ...newUserData,
        nivel: !!newUserData.nivel,
        status: !!newUserData.status,
      };

      const response = await api.post("/usuarios", userDataToSend);
      console.log("Usuário adicionado com sucesso:", response.data);
      onClose();

      // Limpar os dados do formulário após adicionar com sucesso
      setNewUserData({
        id: 0,
        nome: "",
        password: "",
        email: "",
        nickname: "",
        nivel: false,
        status: false,
      });
      setConfirmPassword("");
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      alert("Erro ao adicionar o usuário. Tente novamente.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          backgroundColor="gray.400"
          fontSize="2xl"
          textAlign="center"
          color="#fff"
        >
          Adicionar Novo Usuário
        </ModalHeader>
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
              name="password"
              value={newUserData.password}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Confirmar Senha"
              type="password"
              name="confirm"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <Select
              placeholder="Esse usuário será administrador?"
              name="nivel"
              value={newUserData.nivel.toString()}
              onChange={handleInputChange}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </Select>
            <Select
              placeholder="Selecione o Status"
              name="status"
              value={newUserData.status.toString()}
              onChange={handleInputChange}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
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
