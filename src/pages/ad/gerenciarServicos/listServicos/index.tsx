import { Footer } from "@/components/Form/Footer";
import { useState, useEffect } from "react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import api from "@/services/api";
import { Servico } from "@/components/CriacaoDashboard/interfaces/ServicosInterface";
import EditarServicoModal from "./EditServicoModal";
import DeleteServicoModal from "./DeleteServicoModal";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import { BsFillTrashFill } from "@react-icons/all-files/bs/BsFillTrashFill";

export default function ListarServicos() {
  const [servico, setServico] = useState<Servico[]>([]);
  const [isEditarServicoModalOpen, setEditarServicoModalOpen] = useState(false);
  const [servicoParaEditar, setServicoParaEditar] = useState<{ id: number; nome: string } | undefined>(undefined);
  const [isDeleteServicoModalOPen, setDeleteServicoModalOpen] = useState(false)
  const [servicoParaDeletar, setServicoParaDeletar] = useState<Servico | undefined>(undefined);


  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get<Servico[]>("/servicos");
        setServico(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de servicos:", error);
      }
    };

    fetchServicos();
  }, []);

  const handleEditarClick = (servicoClicado: Servico) => {
    setServicoParaEditar(servicoClicado);
    setEditarServicoModalOpen(true);
  };

  const handleDeletarClick = (servicoClicado: Servico) => {
    setServicoParaDeletar(servicoClicado);
    setDeleteServicoModalOpen(true)
  }
/*
  const handleDeletarClick = async (id: number) => {
    try {
      await api.delete(`/servicos/${id}`);
      const response = await api.get<Servico[]>(`/servicos/`);
      setServico(response.data);
    } catch (error) {
      console.error("Erro ao deletar o serviço:", error);
    }
  };
*/
  
const handleDeletarServico = async () => {
  try {
    if (servicoParaDeletar) {
      const response = await api.get<Servico[]>(`/servicos`);
      setServico(response.data);
      setDeleteServicoModalOpen(false);
    }
  } catch (error) {
    console.error("Erro ao deletar o serviço:", error);
  }
};

  const handleCloseModal = () => {
    setEditarServicoModalOpen(false);
    setDeleteServicoModalOpen(false)
  };

  const handleSalvarServicoEdicao = (editedServico: Servico) => {
    try {
      console.log("Salvando alterações de login:", editedServico);
      setServico((prevUsuarios) =>
        prevUsuarios.map((u) => (u.id === editedServico.id ? editedServico : u))
      );
      setEditarServicoModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar alterações de login:", error);
    }
  };

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#f0f0f0" : "#ffffff";
  };

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"3xl"} fontWeight="800">
        Servicos do iGraph2
      </Text>
      <Box mx="auto" mt={5} textAlign={"center"} fontSize="lg" border="0.225rem solid #000000" borderRadius="md" overflowY={"scroll"} maxW="60vw" maxH={"60vh"}>
        <Table variant="simple">
          <Thead>
            <Tr textAlign={"center"} backgroundColor={"black"}>
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>
                Usuário
              </Th>
              <Th fontSize={"1rem"} color={"#fff"} textAlign={"center"}>
                Opções
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {servico.map((servico, index) => (
              <Tr key={servico.id} backgroundColor={getRowColor(index)}>
                <Td textAlign={"center"}>{servico.nome}</Td>
                <Td textAlign={"center"}>
                  <Button
                    backgroundColor={"blue.400"}
                    margin={"0.3rem"}
                    w={40}
                    color={"#fff"}
                    onClick={() => handleEditarClick(servico)} 
                  >
                    <BsPencilSquare />
                    Editar
                  </Button>
                  <Button
                    backgroundColor={"red.400"}
                    margin={"0.3rem"}
                    w={40}
                    color={"#fff"}
                    onClick={() => handleDeletarClick(servico)}
                  >
                    <BsFillTrashFill />
                    Deletar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Footer />
      <EditarServicoModal isOpen={isEditarServicoModalOpen} onClose={handleCloseModal} servico={servicoParaEditar} onSave={handleSalvarServicoEdicao}  />
      <DeleteServicoModal isOpen={isDeleteServicoModalOPen} onClose={handleCloseModal} servico={servicoParaDeletar} onDelete={handleDeletarServico} />
    </>
  );
}
