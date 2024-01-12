import React from "react";
import {  Modal,  ModalOverlay, ModalContent,  ModalHeader,  ModalCloseButton,  ModalBody,  ModalFooter,  Button,  Tr,  Th,  Table,  Thead,  Tbody,  Td,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import GerarPlanilha from ".";

interface AtendimentosModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: Array<{
    data_atendimento: string;
    unidade: string;
    quantidade: number;
  }> | null;
}

const AtendimentosModal: React.FC<AtendimentosModalProps> = ({
  isOpen,
  onClose,
  tableData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={"145vh"} minWidth={"50vh"}>
        <ModalHeader textAlign={"center"}>Tabela de Atendimentos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table>
            <Thead>
              <Tr backgroundColor={"gray.400"}>
                <Th>Data do Atendimento</Th>
                <Th>Unidade</Th>
                <Th>Quantidade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData?.map((row, index) => (
                <Tr key={index}>
                  {row ? (
                    <>
                      <Td>{row.data_atendimento}</Td>
                      <Td>{row.unidade}</Td>
                      <Td>{row.quantidade}</Td>
                    </>
                  ) : (
                    <Td colSpan={2}>Sem dados</Td>
                  )}
                </Tr>
              ))}
              <Tr backgroundColor={"gray.400"}> 
                    <Td>Total: </Td> 
              </Tr>
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
