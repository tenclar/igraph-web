import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Button, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import { format } from "date-fns";
import api from "@/services/api";
import { Comentarios } from "@/components/CriacaoDashboard/interfaces/ComentarioInterface";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";

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
  const [quantidade, setQuantidade] = useState("");
  const [comentario, setComentario] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (atendimento) {
      setQuantidade(String(atendimento.quantidade));
    }
  }, [atendimento]);

  useEffect(() => {
    if (comentarios) {
      setComentario(comentarios.comentarios || "");
    }
  }, [comentarios]);

  useEffect(() => {
    async function fetchComentarios() {
      if (atendimento) {
        try {
          const response = await api.get(
            `/comentarios/${atendimento.id}/atendimentos`
          );
          setComentarios(response.data);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent borderRadius={"1rem"} border=".125rem solid #000000">
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
          {isEditing ? <Input value={quantidade} textAlign={"center"} onChange={(e) => setQuantidade(e.target.value)} /> : <p>{quantidade}</p>}
          <Text fontSize={"1.4rem"} fontWeight={"bold"} marginTop={3}>Comentários:</Text>
          {isEditing ? <Input value={comentario} textAlign={"center"} onChange={(e) => setComentario(e.target.value)} p={"40px"} /> : <Text h={40}>{comentario || "Esse atendimento não teve comentários registrados" }</Text>}
          {isEditing ? (
            <>
              <Button w={"90px"} color={"#ffffff"} backgroundColor={"green.400"} margin={1} onClick={() => {
                // Aqui você pode fazer uma chamada de API para atualizar as informações
                console.log("Quantidade:", quantidade);
                console.log("Comentário:", comentario);
                setIsEditing(false);
              }}>Salvar</Button>
              <Button w={"90px"} color={"#ffffff"} backgroundColor={"gray.600"} onClick={() => setIsEditing(false)}>Cancelar</Button>
            </>
          ) : (
            <Button w={"90px"} color={"#ffffff"} backgroundColor={"blue.400"} onClick={() => setIsEditing(true)}><BsPencilSquare /></Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAtendimento;
