import { useEffect, useState } from "react";
import api from "@/services/api";
import { Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Button, color, textDecoration } from "@chakra-ui/react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { format } from "date-fns";
import { Footer } from "@/components/Form/Footer";
import { Unidade } from "@/components/Interfaces/UnidadeInterface";
import { AtendimentoData } from "@/components/Interfaces/AtendimentoInterface";
import ModalAtendimento from "./ShowAtendimento/ModalAtendimento";
import { Link } from "@chakra-ui/react";
import {BsSearch} from "@react-icons/all-files/bs/BsSearch"
import {BsFillTrashFill} from "@react-icons/all-files/bs/BsFillTrashFill"

export default function FormDados() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [usuarios, setUsuarios] = useState<{ [key: number]: string }>({});
  const [servicos, setServicos] = useState<{ [key: number]: string }>({});
  const [unidades, setUnidades] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtendimento, setSelectedAtendimento] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [atendimentosRes, usuariosRes, unidadesRes, servicosRes] = await Promise.all([
          api.get("/atendimentos"),
          api.get("/usuarios"),
          api.get("/unidades"),
          api.get("/servicos"),
        ]);
        
        setAtendimentos(atendimentosRes.data.sort((a, b) => new Date(b.data_de_atendimento) - new Date(a.data_de_atendimento)));
        setUsuarios(usuariosRes.data.reduce((acc: any, usuario: any) => ({ ...acc, [usuario.id]: usuario.nome }), {}));
        setUnidades(unidadesRes.data.reduce((acc: any, unidade: any) => ({ ...acc, [unidade.id]: unidade.nome }), {}));
        setServicos(servicosRes.data.reduce((acc: any, servico: any) => ({ ...acc, [servico.id]: servico.nome }), {}));
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchData();
  }, []);

  const getRowColor = (index: number) => (index % 2 === 0 ? "#f0f0f0" : "#ffffff");

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza de que deseja excluir este atendimento?")) {
      try {
        const response = await api.delete(`/atendimentos/${id}`);
        if (response.status === 204) {
          alert("Atendimento excluído com sucesso.");
          setAtendimentos(atendimentos.filter((atendimento: any) => atendimento.id !== id));
        } else {
          alert("Erro ao excluir atendimento.");
        }
      } catch (error) {
        console.error("Erro ao excluir atendimento:", error);
        alert("Erro ao excluir atendimento.");
      }
    }
  };

  return (
    <>
      <HeaderAdmin />
      <Text marginTop="4.2rem" textAlign="center" fontSize="3xl" fontWeight="bold">
        Atendimentos
      </Text>
      <Box mx="auto" mt={5} textAlign="center" fontSize="lg" fontWeight="bold" maxW="175vh" h="60vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll">
        <Table variant="simple">
          <Thead bgColor="#000000">
            <Tr>
              <Th color="#fff" fontSize="0.9rem">Usuário</Th>
              <Th color="#fff" fontSize="0.9rem">Central</Th>
              <Th color="#fff" fontSize="0.9rem">Data</Th>
              <Th color="#fff" fontSize="0.9rem">Atendimentos</Th>
              <Th color="#fff" fontSize="0.9rem">Opções</Th>
            </Tr>
          </Thead>
          <Tbody>
            {atendimentos.map((atendimento: any, index: number) => (
              <Tr key={atendimento.id} bgColor={getRowColor(index)}>
                <Td>{usuarios[atendimento.usuarios_id]}</Td>
                <Td>{unidades[atendimento.unidades_id] || "Não Encontrado"}</Td>
                <Td>{format(new Date(atendimento.data_de_atendimento), "dd/MM/yyyy")}</Td>
                <Td>{servicos[atendimento.servicos_id]}</Td>
                <Td>{atendimento.quantidade}</Td>
                <Td>
                  <Button backgroundColor="green.500" color="#ffffff" w="90px" margin={1} onClick={() => {
                    setSelectedAtendimento(atendimento);
                    setIsModalOpen(true);
                  }}>
                    <BsSearch />
                  </Button>
                  <Button backgroundColor="red.500" color="#ffffff" w="90px" onClick={() => handleDelete(atendimento.id)}>
                    <BsFillTrashFill />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box textAlign="center" mt={3} mb={100}>
        <Button backgroundColor="green.400" color="#ffffff">
          <Link href="/ad/cadastro" textDecoration="none">Novo Atendimento</Link>
        </Button>
      </Box>
      <ModalAtendimento isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} atendimento={selectedAtendimento} usuarios={usuarios} unidades={unidades} servicos={servicos} />
    </>
  );
}