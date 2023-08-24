import api from "@/services/api";
import { styles } from "@/styles/config";
import { Box, Flex, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { isThisMonth, isYesterday, parseISO } from 'date-fns'; // Importe as funções necessárias do date-fns
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface AtendimentoData {
  id: number;
  comentarios: string;
  created_at: string;
  data_de_atendimento: string;
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

export default function DashboardPrincipal() {
  const [listaAtendimentosAno, setListaAtendimentosAno] = useState<AtendimentoData[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [labelsData, setLabelsData] = useState<string[]>([]);
  const [unidadesData, setUnidadesData] = useState<UnidadeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos");
        setListaAtendimentosAno(responseAtendimentos.data);

        const responseUnidades = await api.get("/unidades");
        const unidadesData: UnidadeData[] = responseUnidades.data;
        
        // Cálculo das quantidades por unidade para o gráfico
        const unidadeCount: { [key: number]: number } = {};
        responseAtendimentos.data.forEach((atendimento: AtendimentoData) => {
          const unidadeId = atendimento.unidades_id;
          unidadeCount[unidadeId] = (unidadeCount[unidadeId] || 0) + atendimento.quantidade;
        });

        const unidadesIds = Object.keys(unidadeCount).map(Number);
        const unidadesQuantidades = Object.values(unidadeCount);
        
        const unidadesNomes = unidadesIds.map((id) => {
          const unidade = unidadesData.find((unidade) => unidade.id === id);
          return unidade ? unidade.nome : `Unidade ${id}`;
        });

        setLabelsData(unidadesNomes);
        setSeriesData(unidadesQuantidades);
        setUnidadesData(unidadesData); // Armazenar os dados das unidades
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const calcularQuantidadePorCriterio = (id: number, criterio: (date: Date) => boolean) => {
    return listaAtendimentosAno
      .filter(atendimento => atendimento.unidades_id === id && criterio(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);
  };
  


  const unidadeStats = unidadesData.map((unidade, index) => ({ 
    id: unidade.id,
    nome: unidade.nome,
    ontem: calcularQuantidadePorCriterio(unidade.id, isYesterday),
    mes: calcularQuantidadePorCriterio(unidade.id, isThisMonth),
    total: seriesData[index],
    
  }));

  const totalQuantidade = unidadeStats.reduce((total, unidade) => total + unidade.total, 0);

  const unidadeStatsComTotal = [
    ...unidadeStats,
    {
      nome: 'Total',
      ontem: unidadeStats.reduce((total, unidade) => total + unidade.ontem, 0),
      mes: unidadeStats.reduce((total, unidade) => total + unidade.mes, 0),
      total: totalQuantidade,
    },
  ];

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

  const series = seriesData;


  return (
    <>
      <Flex direction="column" h="100vh">
        <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              <h1 style={styles.h1}>Atendimentos</h1>
              Todas as Centrais
            </Box>
            <Chart options={options} series={series} type="pie" height={300} />
          </Box>
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Estatísticas de atendimento por Unidade
            </Box>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th  fontWeight="bold">Central</Th>
                  <Th  fontWeight="bold">Ontem</Th>
                  <Th  fontWeight="bold">Mês</Th>
                  <Th  fontWeight="bold">Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {unidadeStatsComTotal.map((stats) => (
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
