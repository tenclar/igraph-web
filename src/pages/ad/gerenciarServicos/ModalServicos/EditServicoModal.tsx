import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, Text } from "@chakra-ui/react";
import api from '@/services/api';

interface EditarServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico?: {
    id: number;
    nome: string;
  };
  onSave: (editedServico: {
    id: number;
    nome: string;
  }) => void;
}

const EditarServicoModal: React.FC<EditarServicoModalProps> = ({ isOpen, onClose, servico, onSave }) => {
  const [editServicoData, setEditServicoData] = useState({
    nome: ''
  });

  useEffect(() => {
    // Atualiza o nome quando o serviço muda
    console.log("ID do Serviço:", servico?.id); // Adiciona esta linha para verificar o ID do serviço
    setEditServicoData({
      nome: servico?.nome || ''
    });
  }, [servico]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditServicoData({
      ...editServicoData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (servico) {
        const response = await api.put(`/servicos/${servico.id}`, {
          nome: editServicoData.nome,
        });

        console.log("API Response", response);

        onSave({
          ...servico,
          nome: editServicoData.nome
        });

        console.log('Dados da solicitação:', editServicoData);
        onClose();
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
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