import React, { useState } from 'react';
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
  Select
} from "@chakra-ui/react";
import api from '@/services/api';

interface EditPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    nome: string;
    nivel: number;
    status: string;
  };
  onSave: (editedUser: {
    id: number;
    nome: string;
    nivel: number;
    status: string;
  }) => void;
}

const EditPerfilModal: React.FC<EditPerfilModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [editedUserData, setEditedUserData] = useState({
    nome: user.nome,
    nivel: user.nivel.toString(),
    status: user.status,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/usuarios/${user.id}`, {
        nome: editedUserData.nome,
        nivel: parseInt(editedUserData.nivel),
        status: editedUserData.status,
      });

      onSave({
        ...user,
        nome: editedUserData.nome,
        nivel: parseInt(editedUserData.nivel),
        status: editedUserData.status,
      });

      onClose();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent borderRadius={8} border={"2px solid"} >
        <ModalHeader textAlign={"center"} color={"#fff"} backgroundColor={"gray.400"} borderRadius={8}>Editar Perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Input
              textAlign={"center"}
              placeholder="Nome"
              name="nome"
              value={editedUserData.nome}
              onChange={handleInputChange}
            />
            <Select
              textAlign={"center"}
              placeholder="Nível"
              name="nivel"
              value={editedUserData.nivel}
              onChange={handleInputChange}
            >
              <option value="1">Administrador</option>
              <option value="0">Colaborador</option>
            </Select>
            <Select
            textAlign={"center"}
              placeholder="Status"
              name="status"
              value={editedUserData.status}
              onChange={handleInputChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </Select>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPerfilModal;
