import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, Select, Text, Checkbox} from "@chakra-ui/react";
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
    nivel: 0,
    status: "",
  });

  // Adicione uma nova propriedade para o campo de confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  //FEITO

  //////////////////////////
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewUserData((prev) => ({
      ...prev,
      [name]: name === "nivel" ? (value === "Sim" ? 1 : 0) : value,
    }));

    if (name === "confirm") {
      setConfirmPassword(value); // Atualiza separadamente a confirmação de senha
    }
  };
  //////////////////////

  const handleAddUser = async () => {
    try {
      //
        if(newUserData.password !== confirmPassword) {
          alert("As senhas não coincidems");
          return;
        }

        const userDataToSend: UsuarioData = {
          ...newUserData,
          nivel:newUserData.nivel, // Converter "Sim = 1" ou "Não = 0"
          status: newUserData.status === "Ativo" ? "Ativo" : "Inativo", 
        }
        //Realiza procedimento de requisição á API
        const response = await api.post("/usuarios", userDataToSend);

        console.log("Usuario adicionado com sucesso:", response.data);
        //Fechamento do modal de Usuario
        onClose();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      // Lógica adicional para lidar com o erro, se necessário...
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor={"gray.400"} fontSize={"2xl"} textAlign={"center"} color={"#fff"}>Adicionar Novo Usuário</ModalHeader>
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
              value={newUserData.nivel === 1? "Sim" : "Não"}
              onChange={handleInputChange}
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
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
