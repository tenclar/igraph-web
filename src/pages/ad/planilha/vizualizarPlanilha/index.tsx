import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button,  Text,  useDisclosure,  Select,  Input,  Checkbox} from "@chakra-ui/react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { useEffect, useState } from "react";
import api from "@/services/api";
import AtendimentosModal from "./atendimentosModal";

export default function GerarPlanilha() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);
  const [selectedUnidadeId, setSelectedUnidadeId] = useState<number | null>(  null );
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [tableData, setTableData] = useState<Array<{ data_atendimento: string; unidade: string;  quantidade: number;  usuario: number; }> | null>(null);
  const [totalQuantidade, setTotalQuantidade] = useState<number>(0);

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

  useEffect(() => {
    // Recalcula o total sempre que a tabela de dados for alterada
    if (tableData) {
      const total = tableData.reduce(
        (accumulator, row) => accumulator + (row?.quantidade || 0),
        0
      );
      setTotalQuantidade(total);
    }
  }, [tableData]);

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

  const handleVisualizarPlanilha = async () => {
    try {
      console.log("Parâmetros da API para visualização:", {
        selectedUnidadeId,
        dataInicio,
        dataFim,
      });

      // Formate as datas para o formato YYYY-MM-DD
      const formattedDataInicio = new Date(dataInicio)
        .toISOString()
        .split("T")[0];
      const formattedDataFim = new Date(
        new Date(dataFim).getTime() + 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

      const response = await api.post(
        `/atendimentos/${selectedUnidadeId}/${formattedDataInicio}/${formattedDataFim}`
      );

      const unidadeNome = unidades.find(
        (unidade) => unidade.id === selectedUnidadeId
      )?.nome || "";

      const atendimentosData = (response.data as any[]).map(
        (atendimento: any) => {
          if ("data_atendimento" in atendimento) {
            return {
              data_atendimento: new Date(
                atendimento.data_atendimento
              ).toLocaleDateString(),
              unidade: unidadeNome,
              quantidade: atendimento.quantidade,
            };
          }
          return null;
        }
      );

      console.log("Atendimentos para visualização:", atendimentosData);
      console.log(totalQuantidade)

      setTableData(atendimentosData.filter(Boolean)); // Filtrar os valores nulos
      onOpen();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao obter os atendimentos para visualização.");
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
         Escolha uma Central:
        </Text>
        
        <Select
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          backgroundColor={"#fff"}
          onChange={(e) => setSelectedUnidadeId(Number(e.target.value))}
        >
          {/* Mapeie as unidades */}
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
        totalQuantidade={totalQuantidade}
      />
    </>
  );
};
