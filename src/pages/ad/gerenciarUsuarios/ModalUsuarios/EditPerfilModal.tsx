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
  Select,
} from '@chakra-ui/react';
import api from '@/services/api';

interface EditPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    nome: string;
    email: string;
    nickname: string;
    password: string;
    nivel: boolean;
    status: boolean;
  };
  onSave: (editedUser: {
    id: number;
    nome: string;
    email: string;
    nickname: string;
    password: string;
    nivel: boolean;
    status: boolean;
  }) => void;
}

const EditPerfilModal: React.FC<EditPerfilModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [editedUserData, setEditedUserData] = useState({
    nome: user.nome,
    nivel: user.nivel, // Mantém boolean
    status: user.status, // Mantém boolean
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEditedUserData((prev) => ({
      ...prev,
      [name]: name === 'nivel' || name === 'status' ? value === 'true' : value, // Converte para boolean se necessário
    }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        nome: editedUserData.nome,
        nivel: editedUserData.nivel, // Já é boolean
        status: editedUserData.status, // Já é boolean
      };

      console.log('Dados enviados:', updatedUser);

      await api.put(`/usuarios/${user.id}`, updatedUser);

      onSave({
        ...user,
        ...updatedUser,
      });

      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar alterações:', error);
      alert(`Erro ao salvar alterações: ${error.message}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent borderRadius={8} border={'2px solid'}>
        <ModalHeader textAlign={'center'} color={'#fff'} backgroundColor={'gray.400'} borderRadius={8}>
          Editar Perfil
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Input
              textAlign={'center'}
              placeholder="Nome"
              name="nome"
              value={editedUserData.nome}
              onChange={handleInputChange}
            />
            <Select
              textAlign={'center'}
              name="nivel"
              value={editedUserData.nivel.toString()} // Converte para string para exibição
              onChange={handleInputChange}
            >
              <option value="true">Administrador</option>
              <option value="false">Colaborador</option>
            </Select>
            <Select
              textAlign={'center'}
              name="status"
              value={editedUserData.status.toString()} // Converte para string para exibição
              onChange={handleInputChange}
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
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
