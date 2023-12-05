import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, Text } from "@chakra-ui/react";
import api from '@/services/api';

interface EditarServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico: {
    id: number
    nome: string;
  }
}

const EditarServicoModal: React.FC<EditarServicoModalProps> = ({ isOpen, onClose, servico }) => {
  const [editServicoData, setEditServicoData] = useState({
    nome: servico.nome, // Preenche o nome atual do serviço
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditServicoData({
      ...editServicoData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Fazer chamada à API para atualizar o serviço
      await api.put(`/servicos/${servico.id}`, editServicoData);
      onClose(); // Fechar o modal após o sucesso
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>Nome do Serviço:</Text>
            <Input
              type="text"
              name="nome"
              value={editServicoData.nome}
              onChange={handleInputChange}
            />
            {/* Adicione outros campos conforme necessário */}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditarServicoModal;
