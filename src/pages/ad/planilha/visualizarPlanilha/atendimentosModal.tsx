import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Tr, Th, Table, Thead, Tbody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import GerarPlanilha from "..";

interface AtendimentosModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: Array<{ data_atendimento: string; unidade: string }> | null;
}


const AtendimentosModal: React.FC<AtendimentosModalProps> = ({ isOpen, onClose, tableData }) => {


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tabela de Atendimentos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table>
            <Thead>
              <Tr>
                <Th>Data do Atendimento</Th>
                <Th> Unidade</Th>
              </Tr>
            </Thead>
            <Tbody>
            {tableData?.map((row, index) => (
  <tr key={index}>
    {row ? (
      <>
        <td>{row.data_atendimento}</td>
        <td>{row.unidade}</td>m
      </>
    ) : (
      <td colSpan={2}>Sem dados</td>
    )}
  </tr>
))}

            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AtendimentosModal;
