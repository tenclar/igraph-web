import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Stack, Text, } from "@chakra-ui/react";
  import { useState } from "react";
  import { Servico } from "@/components/CriacaoDashboard/interfaces/ServicosInterface";
  import api from "@/services/api";
  
  interface AddServicoModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const AddServicoModal: React.FC<AddServicoModalProps> = ({ isOpen, onClose }) => {
    const [nomeServico, setNomeServico] = useState<string>("");
    
    const handleAdicionarServico = async () => {
        try {
            // Verificar se o nome do serviço está preenchido
            if (!nomeServico) {
                console.error("O nome do serviço não pode estar vazio");
                return;
            }
            
            // Criar um novo objeto com os dados do serviço
            const newServicoData: Servico = {
          id: 0,
          nome: nomeServico,
          // Adicione outros campos conforme necessário
        };
        
        // Fazer chamada à API para adicionar o serviço
        console.log("Dados do serviço a serem enviados:", newServicoData);
        const response = await api.post("/servicos", newServicoData);
        
        // Limpar o estado após a adição do serviço
        setNomeServico("");
        onClose();
        
  
        console.log("Resposta da API:", response.data);
      } catch (error) {
        console.error("Erro ao adicionar serviço:", error);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={"gray.400"}
            fontSize={"2xl"}
            textAlign={"center"}
            color={"#fff"}
          >
            Adicionar Serviço
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>Nome do Serviço:</Text>
              <Input
                placeholder="Digite o nome do serviço"
                value={nomeServico}
                onChange={(e) => setNomeServico(e.target.value)}
              />
              {/* Adicione outros campos conforme necessário */}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleAdicionarServico}>
              Adicionar Serviço
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
  