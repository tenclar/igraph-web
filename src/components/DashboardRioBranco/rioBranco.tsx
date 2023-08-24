import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { isThisMonth, parseISO } from "date-fns";
import api from "@/services/api";

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

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

// Restante das interfaces e imports

export default function DashboardRioBranco() {
  const [atendimentosRioBranco, setAtendimentosRioBranco] = useState<AtendimentoData[]>([]);
  const [presencialQuantidade, setPresencialQuantidade] = useState<number>(0);
  const [callCenterQuantidade, setCallCenterQuantidade] = useState<number>(0);
  const [redesSociaisQuantidade, setRedesSociaisQuantidade] = useState<number>(0);

  useEffect(() => {
    const fetchAtendimentosRioBranco = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos", {
          params: {
            unidades_id: 1, // ID da unidade "Rio Branco"
          },
        });
        setAtendimentosRioBranco(responseAtendimentos.data);
        calculateCategoryQuantities(responseAtendimentos.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAtendimentosRioBranco();
  }, []);

  const calculateCategoryQuantities = (atendimentos: AtendimentoData[]) => {
    const presencialQuantity = atendimentos
      .filter((atendimento) => atendimento.servicos_id === 1 && isThisMonth(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);
    
    const callCenterQuantity = atendimentos
      .filter((atendimento) => atendimento.servicos_id === 2 && isThisMonth(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);

    const redesSociaisQuantity = atendimentos
      .filter((atendimento) => atendimento.servicos_id === 3 && isThisMonth(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);

    setPresencialQuantidade(presencialQuantity);
    setCallCenterQuantidade(callCenterQuantity);
    setRedesSociaisQuantidade(redesSociaisQuantity);
  };

  const options: ApexOptions = {
    labels: ["Presencial", "Call Center", "Redes Sociais"],
    legend: {
      position: "bottom",
      markers: {
        width: 20,
        radius: 4,
      },
    },
  };

  const series = [presencialQuantidade, callCenterQuantidade, redesSociaisQuantidade];

  return (
    <>
      <Flex direction="column" h="100vh">
        <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Unidade Rio Branco
            </Box>
            <Chart options={options} series={series} type="pie" height={300} />
          </Box>
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Detalhes de Atendimento - Unidade Rio Branco
            </Box>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th fontWeight="bold">Periodo</Th>
                  <Th fontWeight="bold">Presencial</Th>
                  <Th fontWeight="bold">Call Center</Th>
                  <Th fontWeight="bold">Redes Sociais</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Ontem</Td>
                  <Td>{presencialQuantidade}</Td>
                </Tr>
                <Tr>
                  <Td>Mês</Td>
                  <Td>{callCenterQuantidade}</Td>
                </Tr>
                <Tr>
                  <Td>Parcial</Td>
                  <Td>{redesSociaisQuantidade}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
