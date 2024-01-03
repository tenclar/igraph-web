import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button, Text, useDisclosure, Select, Input} from "@chakra-ui/react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { useEffect, useState } from "react";
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface";
import api from "@/services/api";
import AtendimentosModal from "./visualizarPlanilha/atendimentosModal";

interface AtendimentosModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: Array<{ dado1: string; dado2: string }> | null;
}

export default function GerarPlanilha() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);
  const [selectedUnidadeId, setSelectedUnidadeId] = useState<number | null>( null);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [usuarios, setUsuarios] = useState<string>("");
  const [tableData, setTableData] = useState<Array<{ data_atendimento: string; unidade: string; quantidade:number ;usuario: string;}> | null>(null);

  


  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await api.get("/unidades");
        const data = response.data;

        if (data && data.length > 0) {
          setSelectedUnidade(data[0]);
          setSelectedUnidadeId(data[0].id);
        }
        setUnidades(data);
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao buscar as unidades.");
      }
    }

    fetchUnidades();
  }, []);

  const handleGerarPlanilha = async () => {
    try {
      console.log("Parâmetros da API:", {
        selectedUnidadeId,
        dataInicio,
        dataFim,
      });

      const response = await api.get(
        `/atendimentos/${selectedUnidadeId}/${dataInicio}/${dataFim}`
      );
      const atendimentosData = response.data.map((atendimento: any) => ({
        dado1: atendimento.data,
        dado2: atendimento.dado2,
        unidade: selectedUnidade?.nome || "",
      }));

      console.log("Atendimentos:", atendimentosData);

      setTableData(atendimentosData);
      onOpen();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao obter os atendimentos.");
    }
  };

  // ...

  const handleVisualizarPlanilha = async () => {
    try {
      console.log("Parâmetros da API para visualização:", { selectedUnidadeId, dataInicio, dataFim });
  
      // Formate as datas para o formato YYYY-MM-DD
      const formattedDataInicio = new Date(dataInicio).toISOString().split('T')[0];
      const formattedDataFim = new Date(new Date(dataFim).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const unidadesResponse = await api.get("/unidades");
      const unidadesData = unidadesResponse.data;
      const unidadeEncontrada = unidadesData.find((unidade: any) => unidade.id === selectedUnidadeId);
      const unidadeNome = unidadeEncontrada ? unidadeEncontrada.nome : '';
      console.log(unidadeNome)
  
      const response = await api.post(`/atendimentos/${selectedUnidadeId}/${formattedDataInicio}/${formattedDataFim}`);
        
      const atendimentosData = (response.data as any[]).map((atendimento: any) => {
        if ('data_atendimento' in atendimento) {
          return {
            data_atendimento: new Date(atendimento.data_atendimento).toLocaleDateString(), // Formate a data como desejado
            unidade: unidadeNome,
            quantidade: atendimento.quantidade,
            usuario: atendimento.usuarios_id
          };
        }
        return null;
      });
  
      console.log("Atendimentos para visualização:", atendimentosData);
  
      setTableData(atendimentosData.filter(Boolean)); // Filtrar os valores nulos
      onOpen();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao obter os atendimentos para visualização.");
      console.log("Ocorreu um erro ao obter os atendimentos para visualização.");
    }
  };
  
  
  

  return (
    <>
      <HeaderAdmin />
      <Text
        marginTop={"5rem"}
        textAlign={"center"}
        fontSize={"4xl"}
        fontWeight="800"
      >
        Planilha iGraph2
      </Text>
      <Box
        mx="auto"
        mt={7}
        textAlign={"center"}
        fontSize="1rem"
        fontWeight="bold"
        maxW="175vh"
        h="60vh"
        overflowY="scroll"
      >
        <Text>Data de Início</Text>
        <Input
          type={"date"}
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          bg={"#fffffff"}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <Text mt={3}>Data de Fim</Text>
        <Input
          type={"date"}
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          bg={"#fffffff"}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <Text fontSize={"2xl"} mt={2}>
          Central:
        </Text>
        <Select
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          backgroundColor={"#fff"}
          onChange={(e) => setSelectedUnidadeId(Number(e.target.value))}
        >
          {unidades.map((unidade) => (
            <option key={unidade.id} value={unidade.id}>
              {unidade.nome}
            </option>
          ))}
        </Select>

        <Button
          margin={5}
          w={200}
          h={100}
          backgroundColor={"green.500"}
          color={"#fff"}
          border=".125rem solid #000000"
          onClick={handleGerarPlanilha}
        >
          Gerar Planilha
        </Button>
        <Button
          w={200}
          margin={15}
          h={100}
          backgroundColor={"blue.500"}
          color={"#fff"}
          border=".125rem solid #000000"
          onClick={handleVisualizarPlanilha}
        >
          Visualizar Planilha
        </Button>
      </Box>
      <Footer />

      <AtendimentosModal
        isOpen={isOpen}
        onClose={onClose}
        tableData={tableData}
      />
    </>
  );
}
