import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import { format } from "date-fns";
import api from "@/services/api";
import { Comentarios } from "@/components/CriacaoDashboard/interfaces/ComentarioInterface";
import {BsPencilSquare} from "@react-icons/all-files/bs/BsPencilSquare"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atendimento: AtendimentoData | null;
  usuarios: { [key: number]: string };
  unidades: { [key: number]: string };
  servicos: { [key: number]: string };
}

const ModalAtendimento: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  atendimento,
  usuarios,
  unidades,
  servicos,
}) => {

  const [comentarios, setComentarios] = useState<Comentarios | undefined>();
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição da quantidade
  const [editedQuantidade, setEditedQuantidade] = useState(atendimento?.quantidade || "");
  React.useEffect(() => {
    
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

  const handleEditClick = () => {
    // Ativar o modo de edição quando o botão de edição for clicado
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Salvar as alterações e desativar o modo de edição quando o botão de salvar for clicado
    setIsEditing(false);
    // Você pode aqui fazer uma solicitação para salvar a quantidade editada na API, se necessário.
    // Lembre-se de atualizar a quantidade no objeto 'atendimento' também.
  };
  
  console.log(comentarios?.comentarios)
  return (
    <Modal  isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      
      <ModalOverlay  />
      <ModalContent borderRadius={"1rem" } border=".125rem solid #000000">
        <ModalHeader borderRadius={"1rem"} border=".375rem solid #bdbebd" backgroundColor={"#bdbebd"} textAlign={"center"} fontSize={"2rem"} fontWeight={"bold"}>Detalhes do Atendimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={4}>Central de Atendimento</Text>
          <p>{unidades[atendimento.unidades_id]}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Usuario Responsavel pela coleta de dados</Text>
          <p>{usuarios[atendimento.usuarios_id]}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Data do Atendimento</Text>
          <p>{formattedDate}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Quantidade</Text>
          <p>{servicos[atendimento.servicos_id]}</p>
          <p>{atendimento.quantidade}</p>
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Comentários:</Text>
          <Text h={40}>{comentarios?.comentarios || "Esse atendimento não teve comentários registrados" }</Text>
          <Button w={"90px"} color={"#ffffff"} backgroundColor={"blue.400"}><BsPencilSquare/></Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAtendimento;
