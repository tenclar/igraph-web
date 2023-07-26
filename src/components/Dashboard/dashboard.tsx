import api from "@/services/api";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos"); // Substitua "/atendimentos" pelo endpoint correto da sua API
        setListaAtendimentosAno(responseAtendimentos.data);

        // Puxar os dados da rota de unidades
        const responseUnidades = await api.get("/unidades"); // Substitua "/unidades" pelo endpoint correto da sua API
        const unidadesData: UnidadeData[] = responseUnidades.data;

        // Cria um objeto para contar a quantidade de vezes que cada unidade aparece
        const unidadeCount: { [key: number]: number } = {};
        responseAtendimentos.data.forEach((atendimento: AtendimentoData) => {
          const unidadeId = atendimento.unidades_id;
          unidadeCount[unidadeId] = (unidadeCount[unidadeId] || 0) + 1;
        });

        // Obtém as labels e séries para o gráfico de pizza
        const unidadesIds = Object.keys(unidadeCount).map(Number);
        const unidadesQuantidades = Object.values(unidadeCount);

        // Preenche as labels com os nomes das unidades obtidos da rota de unidades
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

  const options:ApexOptions = {
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
            <Box fontSize="12" mb={4}>
              Todas as Centrais
            </Box>
            <Chart  options={options} series={series} type="pie" height={300} />
          
            
          </Box>
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="12" mb={4}>
              Estatística de atendimento
              <p>estatistica1</p>
              <p>estatistica2</p>
            </Box>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
