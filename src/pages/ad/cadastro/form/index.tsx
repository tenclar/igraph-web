import { useEffect, useState } from "react";
import api from "@/services/api";
import { Text, VStack, Box, Table, Thead, Tbody, Tr, Th, Td, Button, color, textDecoration } from "@chakra-ui/react";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { format } from "date-fns";
import { Footer } from "@/components/Form/Footer";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import ModalAtendimento from "./ShowAtendimento/ModalAtendimento";
import { Link } from "@chakra-ui/react";
import {BsSearch} from "@react-icons/all-files/bs/BsSearch"
import {BsFillTrashFill} from "@react-icons/all-files/bs/BsFillTrashFill"


export default function FormDados() {
  const [atendimentos, setAtendimentos] = useState<AtendimentoData[]>([]);
  const [usuarios, setUsuarios] = useState<{ [key: number]: string }>({});
  const [servicos, setServicos] = useState<{ [key: number]: string }>({});
  const [unidades, setUnidades] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtendimento, setSelectedAtendimento] = useState<AtendimentoData | null>(null);

  const handleOpenModal = (atendimento: AtendimentoData) => {
    console.log("Abrindo o modal com o atendimento:", atendimento);  
  
    setSelectedAtendimento(atendimento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Fechando o modal");
    setSelectedAtendimento(null);
    setIsModalOpen(false);
  };
  
  

  useEffect(() => {
    async function fetchAtendimentos() {
      try {
        const response = await api.get<AtendimentoData[]>("/atendimentos");
        //por enquanto erro vai ficar até eu descobrir o fazer.
        response.data.sort((a, b) => new Date(b.data_de_atendimento) - new Date(a.data_de_atendimento));
        setAtendimentos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchUsuarios() {
      try {
        const response = await api.get("/usuarios");
        const usuariosData: { [key: number]: string } = {};
        response.data.forEach((usuario: { id: number; nome: string }) => {
          usuariosData[usuario.id] = usuario.nome;
        });
        setUsuarios(usuariosData);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchUnidades() {
      try {
        const response = await api.get<Unidade[]>("/unidades");
        const unidadesData: { [key: number]: string } = {};
        response.data.forEach((unidade) => {
          unidadesData[unidade.id] = unidade.nome;
        });
        setUnidades(unidadesData);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchServicos() {
      try {
        const response = await api.get("/servicos");
        const servicosData: { [key: number]: string } = {};
        response.data.forEach((servico: { id: number; nome: string }) => {
          servicosData[servico.id] = servico.nome;
        });
        setServicos(servicosData);
      } catch (error) {
        console.error(error);
      }
    }
    

    fetchAtendimentos();
    fetchUsuarios();
    fetchUnidades();
    fetchServicos();
  }, []);

  const getRowColor = (index: number) => {
    return index % 2 === 0 ? "#f0f0f0" : "#ffffff";
  };

  

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"4.2rem"} textAlign="center" fontSize="3xl" fontWeight="bold">
       Atendimentos
      </Text>
      <Box mx="auto" mt={5} textAlign="center" fontSize="lg" fontWeight="bold" maxW="175vh" h="60vh" border=".125rem solid #000000" borderRadius="md" overflowY="scroll">
        <Table variant="simple">
          <Thead maxW="175vh"  bgColor={"#000000"} >
            <Tr >
              <Th color={"#fff"} fontSize={"0.9rem"} paddingLeft={10} >Usuário</Th>
              <Th color={"#fff"} fontSize={"0.9rem"} >Central</Th>
              <Th color={"#fff"} fontSize={"0.9rem"} paddingLeft={10}>Data</Th>
              <Th color={"#fff"} fontSize={"0.9rem"}>Atendimentos</Th>
              <Th color={"#fff"} fontSize={"0.9rem"} paddingLeft={20} >Opções</Th>
            </Tr>
          </Thead>
          <Tbody>
  {atendimentos.map((atendimento, index) => (
    <Tr
      key={atendimento.id}
      bgColor={getRowColor(index)}
      
      
    >
      <Td>{usuarios[atendimento.usuarios_id]}</Td>
      <Td>{unidades[atendimento.unidades_id]}</Td>
      <Td>{format(new Date(atendimento.data_de_atendimento), "dd/MM/yyyy")}</Td>
      <Td paddingLeft={20}> <Td paddingLeft={-4}>{servicos[atendimento.servicos_id]}</Td> {atendimento.quantidade}</Td>
      <Td>
        <Button
          backgroundColor={"green.500"}
          color={"#ffffff"}
          w={"90px"}
          margin={1}
          onClick={() => {
            handleOpenModal(atendimento);
          }}
        >
          <BsSearch/>
          
        </Button>
        <Button
          backgroundColor={"red.500"}
          color={"#ffffff"}
          w={"90px"}
          onClick={async () => {
            const confirmDelete = window.confirm(
              "Tem certeza de que deseja excluir este atendimento?"
            );

            if (confirmDelete) {
              try {
                const response = await api.delete(`/atendimentos/${atendimento.id}`);

                if (response.status === 204) {
                  // Atualize a interface ou faça qualquer outra ação após a exclusão bem-sucedida
                  alert("Atendimento excluído com sucesso.");
                  window.location.reload()
                } else {
                  // Trate outros códigos de status, se necessário
                  alert("Ocorreu um erro ao excluir o atendimento.");
                }
              } catch (error) {
                console.error("Erro ao excluir o atendimento:", error);
                alert("Ocorreu um erro ao excluir o atendimento.");
              }
            }
          }}
        >
          <BsFillTrashFill />
        </Button>
      </Td>
    </Tr>
  ))}
</Tbody>
        </Table>
      </Box>
      <Box textAlign={"center"} marginTop={3} marginBottom={100}>
      <Button backgroundColor={"green.400"} color={"#ffffff"}>
        <Link href="/ad/cadastro" style={{textDecoration:"none"}} >Novo Atendimento</Link>
      </Button>
      </Box>
      <Footer />
      <ModalAtendimento isOpen={isModalOpen} onClose={handleCloseModal} atendimento={selectedAtendimento} usuarios={usuarios} unidades={unidades} servicos={servicos}/>   
    </>
  );
}
