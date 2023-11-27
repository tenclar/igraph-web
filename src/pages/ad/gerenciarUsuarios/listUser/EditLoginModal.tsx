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
    nickname: string;
    nivel: number;
    status: string;
  };
  onSave: (editedLogin: {
    id: number;
    nome: string;
    nickname: string;
    nivel: number;
    status: string;
  }) => void;
}

const EditarLoginModal: React.FC<EditPerfilModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [editedLoginData, setEditedLoginData] = useState({
    nickname: user.nickname,
    nivel: user.nivel.toString(),
    status: user.status,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { nickname, value } = e.target;
    setEditedLoginData(prev => ({ ...prev, [nickname]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/usuarios/${user.id}`, {
        nickname: editedLoginData.nickname,
        nivel: parseInt(editedLoginData.nivel),
        status: editedLoginData.status,
      });

      onSave({
        ...user,
        nickname: editedLoginData.nickname,
        nivel: parseInt(editedLoginData.nivel),
        status: editedLoginData.status,
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
        <ModalHeader textAlign={"center"} color={"#fff"} backgroundColor={"gray.400"} borderRadius={8}>Editar Login do Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            
            <Input
              textAlign={"center"}
              placeholder="Nome"
              name="nome"
              value={editedLoginData.nickname}
              onChange={handleInputChange}
            />
            
            <Input
              textAlign={"center"}
              placeholder="Senha"  
            />
            <Input
              textAlign={"center"}
              placeholder="Confirme a Senha"  
            />
            
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

export default EditarLoginModal;
