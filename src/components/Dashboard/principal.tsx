import api from "@/services/api";
import { Box, Flex, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";



interface AtendimentoData {
  id: number;
  comentarios: string;
  created_at: string;
  data_de_Atendimento: string;
  quantidade: number;
  servicos_id: number;
  unidades_id: number;
  updated_at: string;
  usuarios_id: number;
}

export interface UnidadeData {
  id: number;
  nome: string;
  // Outras propriedades da unidade, se houver
}

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Dashboard() {
  const [listaAtendimentosAno, setListaAtendimentosAno] = useState<AtendimentoData[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [labelsData, setLabelsData] = useState<string[]>([]);
  const [unidadesData, setUnidadesData] = useState<UnidadeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos"); //Pega do endpoint da rota atendimentos
        setListaAtendimentosAno(responseAtendimentos.data);

        // Puxar os dados da rota de unidades
        const responseUnidades = await api.get("/unidades"); // Pega do endpoint da rota unidades
        const unidadesData: UnidadeData[] = responseUnidades.data;

        // Cria um objeto para somar a quantidade de atendimentos por unidade
        const unidadeCount: { [key: number]: number } = {};
        responseAtendimentos.data.forEach((atendimento: AtendimentoData) => {
          const unidadeId = atendimento.unidades_id;
          unidadeCount[unidadeId] = (unidadeCount[unidadeId] || 0) + atendimento.quantidade;
        });

        // Obtém as labels e séries para o gráfico de pizza
        const unidadesIds = Object.keys(unidadeCount).map(Number);
        const unidadesQuantidades = Object.values(unidadeCount);

        
        const unidadesNomes = unidadesIds.map((id) => {
          const unidade = unidadesData.find((unidade) => unidade.id === id);
          return unidade ? unidade.nome : `Unidade ${id}`;
        });

        setLabelsData(unidadesNomes);
        setSeriesData(unidadesQuantidades);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    labels: labelsData,
    legend: {
      position: "left",
      markers: {
        width: 20,
        radius: 4,
      },
    },
  };

 

  const unidadeStats = unidadesData.map((unidade, index) => ({
    nome: unidade.nome,
    ontem: calcularQuantidade("ontem", unidade.id),
    mes: calcularQuantidade("mes", unidade.id),
    total: calcularQuantidade("total", unidade.id),
  }));

  const calcularQuantidade = (periodo: string, unidadeId: number) => {
    const atendimentosDoPeriodo = listaAtendimentosAno.filter((atendimento) =>
      atendimento.unidades_id === unidadeId && atendimento.data_de_Atendimento === periodo
    );

    return atendimentosDoPeriodo.reduce((total, atendimento) => total + atendimento.quantidade, 0);
  };

  return (
    <>
      <Flex direction="column" h="100vh">
        <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Todas as Centrais
            </Box>
            <Chart options={options} series={seriesData} type="pie" height={300} />
          </Box>
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Estatísticas de atendimento por Unidade
            </Box>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Central</Th>
                  <Th>Ontem</Th>
                  <Th>Mês</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {unidadeStats.map((stats) => (
                  <Tr key={stats.nome}>
                    <Td>{stats.nome}</Td>
                    <Td>{stats.ontem}</Td>
                    <Td>{stats.mes}</Td>
                    <Td>{stats.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {/* ... */}
        </SimpleGrid>
        {/* ... */}
      </Flex>
    </>
  );
}