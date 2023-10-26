import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import { format } from 'date-fns'; // Importe a função format do date-fns

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  atendimento: AtendimentoData | null;
  usuarios: { [key: number]: string };
  unidades: { [key: number]: string };
}

const ModalAtendimento: React.FC<ModalProps> = ({ isOpen, onClose, atendimento, usuarios, unidades }) => {
  if (!atendimento) {
    return null;
  }

  console.log(atendimento);

  const formattedDate = format(new Date(atendimento.data_de_atendimento), 'dd/MM/yyyy'); // Formate a data

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Detalhes do Atendimento</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Text fontWeight={"bold"}>Central de Atendimento</Text>
          <p>Usuário: {usuarios[atendimento.usuarios_id]}</p>
          <p>Central: {unidades[atendimento.unidades_id]}</p>
          <p>Data de Atendimento: {formattedDate}</p> {/* Use a data formatada aqui */}
          <p>Quantidade: {atendimento.quantidade}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAtendimento;
