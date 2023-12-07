import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, Text } from "@chakra-ui/react";
import api from '@/services/api';

interface DeleteServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  servico?: {
    id: number;
    nome: string;
  };
  onDelete: (DeleteServico: {
    id: number;
    nome: string;
  }) => void;
}

const DeleteServicoModal: React.FC<DeleteServicoModalProps> = ({ isOpen, onClose, servico, onDelete }) => {
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

 

  const handleSaveChanges = async () => {
    try {
      if (servico) {
        const response = await api.delete(`/servicos/${servico.id}`, {
        });

        console.log("API Response", response);

        onDelete({
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
        <ModalHeader>Deletar Serviço</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>Tem certeza que deseja deletar esse servico?</Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleSaveChanges}>
            Deletar
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteServicoModal;