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
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { Servico } from "@/components/CriacaoDashboard/interfaces/ServicosInterface";
import api from "@/services/api";
import React, { useState } from "react";

interface AddServicoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddServicoModal: React.FC<AddServicoModalProps> = ({ isOpen,  onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader backgroundColor={"gray.400"} fontSize={"2xl"} textAlign={"center"} color={"#fff"}>Adicionar Serviço</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={4}>
        <Text>Nome do Serviço:</Text>
            <Input placeholder="Digite o nome do serviço" />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="green" mr={3}>
            Adicionar Servico
        </Button>
        <Button colorScheme="gray" onClick={onClose}>
            Cancelar
        </Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddServicoModal;
