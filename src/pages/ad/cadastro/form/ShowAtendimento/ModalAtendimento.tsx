
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import { format } from "date-fns";
import api from "@/services/api";
import { Comentarios } from "@/components/CriacaoDashboard/interfaces/ComentarioInterface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atendimento: AtendimentoData | null;
  usuarios: { [key: number]: string };
  unidades: { [key: number]: string };
}

const ModalAtendimento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  atendimento,
  usuarios,
  unidades,
}) => {

  const [comentarios, setComentarios] = useState<Comentarios | undefined>(); // Estado para armazenar os comentários

  React.useEffect(() => {
    // Função para buscar os comentários quando o modal é aberto
    async function fetchComentarios() {
      if (atendimento) {
        try {
          const response = await api.get(
            `/comentarios/${atendimento.id}/atendimentos`
          );
          setComentarios(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (isOpen) {
      fetchComentarios();
    }
  }, [isOpen, atendimento]);

  if (!atendimento) {
    return null;
  }

  const formattedDate = format(
    new Date(atendimento.data_de_atendimento),
    "dd/MM/yyyy"
  );
  
  console.log(comentarios?.comentarios)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor={"#bdbebd"} textAlign={"center"} fontSize={"2rem"} fontWeight={"bold"}>Detalhes do Atendimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={4}>Central de Atendimento</Text>
          <p>{unidades[atendimento.unidades_id]}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Usuario Responsavel pela coleta de dados</Text>
          <p>{usuarios[atendimento.usuarios_id]}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Data do Atendimento:</Text>
          <p>{formattedDate}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Quantidade</Text>
          <p>{atendimento.quantidade}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Comentários:</Text>
          <Text h={40}>{comentarios?.comentarios || "Esse atendimento não teve comentários registrados" }</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAtendimento;
