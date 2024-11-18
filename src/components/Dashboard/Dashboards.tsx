import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { isThisMonth, isYesterday, parseISO } from "date-fns";
import api from "@/services/api";
import { styles } from "@/styles/config";
import { AtendimentoData } from "../Interfaces/AtendimentoInterface";
import { Unidade } from "../Interfaces/UnidadeInterface";
import { Servico } from "../Interfaces/ServicosInterface";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardUnidade() {
  const [servicos, setServicos] = useState<number[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [servicosNomes, setServicosNomes] = useState<{ [key: number]: string }>({});
  const [atendimentosUnidades, setAtendimentosUnidades] = useState<AtendimentoData[]>([]);
  const [quantities, setQuantities] = useState<{
    [unidadeId: number]: {
      [servicoId: number]: { ontem: number; mes: number; parcial: number };
    };
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUnidades = await api.get("/unidades");
        const unidadesData = responseUnidades.data;
        setUnidades(unidadesData);

        const atendimentosPorUnidade = [];
        const allAtendimentosData = [];

        for (const unidade of unidadesData) {
          if (unidade.id !== 0) {
            const responseAtendimentos = await api.get("/atendimentos", {
              params: {
                unidades_id: unidade.id,
              },
            });
            const atendimentosData = responseAtendimentos.data;
            atendimentosPorUnidade.push(atendimentosData);
            allAtendimentosData.push(...atendimentosData);
          }
        }

        setAtendimentosUnidades(atendimentosPorUnidade);
        const uniqueServicos = Array.from(
          new Set(
            allAtendimentosData.map((atendimento) => atendimento.servicos_id)
          )
        );
        setServicos(uniqueServicos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (unidades.length > 0 && atendimentosUnidades.length > 0) {
      calculateQuantities();
    }
  }, [unidades, atendimentosUnidades]);

  const fetchServicosNomes = async () => {
    try {
      const responseServicos = await api.get("/servicos");
      const servicosData = responseServicos.data;

      servicosData.forEach((servico: { id: number; nome: string }) => {
        servicosNomes[servico.id] = servico.nome;
      });
      const nomes = servicosData.reduce(
        (acc: { [key: number]: string }, servico: { id: number; nome: string }) => {
          acc[servico.id] = servico.nome;
          return acc;
        },
        {}
      );

      setServicosNomes(nomes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServicosNomes();
  }, []);

  const calcularQuantidadePorCriterio = (
    atendimentos: AtendimentoData[],
    criterio: (date: Date) => boolean
  ) => {
    return atendimentos
      .filter((atendimento) =>
        criterio(parseISO(atendimento.data_de_atendimento))
      )
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);
  };

  const calculateQuantities = () => {
    const newQuantities: {
      [unidadeId: number]: {
        [servicoId: number]: { ontem: number; mes: number; parcial: number };
      };
    } = {};

    unidades.forEach((unidade) => {
      newQuantities[unidade.id] = {};

      servicos.forEach((servico) => {
        const servicoAtendimentos = atendimentosUnidades
          .flat()
          .filter(
            (atendimento) =>
              atendimento.servicos_id === servico && atendimento.unidades_id == unidade.id
          );
        const ontem = calcularQuantidadePorCriterio(servicoAtendimentos, isYesterday);
        const mes = calcularQuantidadePorCriterio(servicoAtendimentos, isThisMonth);
        const parcial = calcularQuantidadePorCriterio(
          servicoAtendimentos,
          () => true // Criterio para obter todas as datas
        );

        console.log(`Serviço ${servico}: Ontem=${ontem}, Mês=${mes}, Parcial=${parcial}`);

        newQuantities[unidade.id][servico] = { ontem, mes, parcial };
      });
    });

    setQuantities(newQuantities);
  };

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
      <Flex direction="column" h="100vh" alignItems="center">
        <SimpleGrid flex={1} gap={4} minChildWidth="800px" alignItems="flex-start" >
          {unidades.map((unidade, index) => (
            <Box key={unidade.id} p={8} bg="white" borderRadius={8} pb={4}>
              <Flex align="center" justifyContent="center">
                <Box flex="1" pr={4}>
                  <Box fontSize="2xl" mb={4}>
                    <h1 style={styles.h1}>Atendimentos</h1>
                    {unidade.nome}
                    <p style={styles.p}> Desde {unidade.data_inaugural}</p>
                  </Box>
                  <Chart
                    options={options}
                    series={servicos.map(
                      (servicoId) =>
                        quantities[unidade.id]?.[servicoId]?.parcial || 0
                    )}
                    type="pie"
                    height={300}
                  />
                </Box>
                <Box flex="1">
                  <Box fontSize="2xl" mb={4}>
                    Detalhes de Atendimento - {unidade.nome}
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
                          <Td key={servicoId}>
                            {quantities[unidade.id]?.[servicoId]?.ontem || 0}
                          </Td>
                        ))}
                      </Tr>
                      <Tr>
                        <Td>Mês</Td>
                        {servicos.map((servicoId) => (
                          <Td key={servicoId}>
                            {quantities[unidade.id]?.[servicoId]?.mes || 0}
                          </Td>
                        ))}
                      </Tr>
                      <Tr>
                        <Td>Parcial</Td>
                        {servicos.map((servicoId) => (
                          <Td key={servicoId}>
                            {quantities[unidade.id]?.[servicoId]?.parcial || 0}
                          </Td>
                        ))}
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}
