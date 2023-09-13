import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { isThisMonth, isYesterday, parseISO } from "date-fns";
import api from "@/services/api";
import { styles } from "@/styles/config";
import { kMaxLength } from "buffer";

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

export default function DashboardRioBranco() {
  const [atendimentosRioBranco, setAtendimentosRioBranco] = useState<AtendimentoData[]>([]);
  const [servicos, setServicos] = useState<number[]>([]);
  const [servicosNomes, setServicosNomes] = useState<{ [key: number]: string }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: { ontem: number; mes: number; parcial: number } }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos", {
          params: {
            unidades_id: 3, // ID da unidade "Rio Branco"
          },
        });
        const atendimentosData: AtendimentoData[] = responseAtendimentos.data;
        setAtendimentosRioBranco(atendimentosData);

        const uniqueServicos = Array.from(new Set(atendimentosData.map((atendimento) => atendimento.servicos_id)));
        setServicos(uniqueServicos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchServicosNomes = async () => {
    try {
      const responseServicos = await api.get("/servicos");
      const servicosData = responseServicos.data;

      const nomes = servicosData.reduce((acc: { [key: number]: string }, servico: { id: number; nome: string }) => {
        acc[servico.id] = servico.nome;
        return acc;
      }, {});

      setServicosNomes(nomes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServicosNomes();
  }, []);

  const calcularQuantidadePorCriterio = (atendimentos: AtendimentoData[], criterio: (date: Date) => boolean) => {
    return atendimentos
      .filter((atendimento) => criterio(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);
  };

  const calculateQuantities = () => {
    const newQuantities: { [key: number]: { ontem: number; mes: number; parcial: number } } = {};

    servicos.forEach((servicoId) => {
      const servicoAtendimentos = atendimentosRioBranco.filter((atendimento) => atendimento.servicos_id === servicoId);
      const ontem = calcularQuantidadePorCriterio(servicoAtendimentos, isYesterday);
      const mes = calcularQuantidadePorCriterio(servicoAtendimentos, isThisMonth);
      const parcial = servicoAtendimentos.reduce((acc, atendimento) => acc + atendimento.quantidade, 0);

      newQuantities[servicoId] = { ontem, mes, parcial };
    });

    setQuantities(newQuantities);
  };

  useEffect(() => {
    calculateQuantities();
  }, [atendimentosRioBranco, servicos]);
 

  
const servicosOrdenados = servicos.sort((a, b) => a - b);

const options: ApexOptions = {
  labels: servicosOrdenados.map((servicoId) => servicosNomes[servicoId] || ""),
  legend: {
    position: "left",
    markers: {
      width: 20,
      radius: 4,
    },
  },
};


  return (
    <>
      <Flex direction="column" h="100vh">
        <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              <h1 style={styles.h1}>Atendimentos</h1>
              Unidade Rio Branco
              <p style={styles.p}>Desde 27 de Dezembro de 2010</p>
            </Box>
            <Chart options={options} series={Object.values(quantities).map((q) => q.parcial)} type="pie" height={300} />
          </Box>
          <Box p={8} bg="white" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Detalhes de Atendimento - Unidade Rio Branco
            </Box>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th fontWeight="bold">Período</Th>
                  {servicos.map((servicoId) => (
                    <Th key={servicoId} fontWeight="bold">
                      {servicosNomes[servicoId] || ""}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Ontem</Td>
                  {servicos.map((servicoId) => (
                    <Td key={servicoId}>{quantities[servicoId]?.ontem || 0}</Td>
                  ))}
                </Tr>
                <Tr>
                  <Td>Mês</Td>
                  {servicos.map((servicoId) => (
                    <Td key={servicoId}>{quantities[servicoId]?.mes || 0}</Td>
                  ))}
                </Tr>
                <Tr>
                  <Td>Parcial</Td>
                  {servicos.map((servicoId) => (
                    <Td key={servicoId}>{quantities[servicoId]?.parcial || 0}</Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
