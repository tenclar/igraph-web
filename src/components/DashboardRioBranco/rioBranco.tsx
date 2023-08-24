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
  const [ontemPresencial, setOntemPresencial] = useState<number>(0);
  const [mesPresencial, setMesPresencial] = useState<number>(0);
  const [parcialPresencial, setParcialPresencial] = useState<number>(0);
  const [ontemCallCenter, setOntemCallCenter] = useState<number>(0);
  const [mesCallCenter, setMesCallCenter] = useState<number>(0);
  const [parcialCallCenter, setParcialCallCenter] = useState<number>(0);
  const [ontemRedesSociais, setOntemRedesSociais] = useState<number>(0);
  const [mesRedesSociais, setMesRedesSociais] = useState<number>(0);
  const [parcialRedesSociais, setParcialRedesSociais] = useState<number>(0);

  useEffect(() => {
    const fetchAtendimentosRioBranco = async () => {
      try {
        const responseAtendimentos = await api.get("/atendimentos", {
          params: {
            unidades_id: 1, // ID da unidade "Rio Branco"
          },
        });
        setAtendimentosRioBranco(responseAtendimentos.data);
        calculateQuantities(responseAtendimentos.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAtendimentosRioBranco();
  }, []);

  const calculateQuantities = (atendimentos: AtendimentoData[]) => {
    const presencialAtendimentos = atendimentos.filter(atendimento => atendimento.servicos_id === 1);
    const callCenterAtendimentos = atendimentos.filter(atendimento => atendimento.servicos_id === 2);
    const redesSociaisAtendimentos = atendimentos.filter(atendimento => atendimento.servicos_id === 3);

    setOntemPresencial(calcularQuantidadePorCriterio(presencialAtendimentos, isYesterday));
    setMesPresencial(calcularQuantidadePorCriterio(presencialAtendimentos, isThisMonth));
    setParcialPresencial(presencialAtendimentos.reduce((acc, atendimento) => acc + atendimento.quantidade, 0));

    setOntemCallCenter(calcularQuantidadePorCriterio(callCenterAtendimentos, isYesterday));
    setMesCallCenter(calcularQuantidadePorCriterio(callCenterAtendimentos, isThisMonth));
    setParcialCallCenter(callCenterAtendimentos.reduce((acc, atendimento) => acc + atendimento.quantidade, 0));

    setOntemRedesSociais(calcularQuantidadePorCriterio(redesSociaisAtendimentos, isYesterday));
    setMesRedesSociais(calcularQuantidadePorCriterio(redesSociaisAtendimentos, isThisMonth));
    setParcialRedesSociais(redesSociaisAtendimentos.reduce((acc, atendimento) => acc + atendimento.quantidade, 0));
  };

  const calcularQuantidadePorCriterio = (atendimentos: AtendimentoData[], criterio: (date: Date) => boolean) => {
    return atendimentos
      .filter(atendimento => criterio(parseISO(atendimento.data_de_atendimento)))
      .reduce((acc, atendimento) => acc + atendimento.quantidade, 0);
  };

  const options: ApexOptions = {
    labels: ["Presencial", "Call Center", "Redes Sociais"],
    legend: {
      position: "left",
      markers: {
        width: 20,
        radius: 4,
      },
    },
  };

  const Presencial = [
    ontemPresencial,
    mesPresencial,
    parcialPresencial,
  ];

  const CallCenter = [
    ontemCallCenter,
    mesCallCenter,
    parcialCallCenter,
  ];

  const RedesSociais = [
    ontemRedesSociais,
    mesRedesSociais,
    parcialRedesSociais,
  ];

  return (
    <>
      <Flex direction="column" h="100vh">
        <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
          <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              <h1 style={styles.h1}>Atendimentos</h1>
              Unidade Rio Branco
            </Box>
            <Chart options={options} series={Presencial} type="pie" height={300} />
          </Box>
          <Box p={8} bg="white" borderRadius={8} pb={4}>
            <Box fontSize="2xl" mb={4}>
              Detalhes de Atendimento - Unidade Rio Branco
            </Box>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th fontWeight="bold">Período</Th>
                  <Th fontWeight="bold">Presencial</Th>
                  <Th fontWeight="bold">Call Center</Th>
                  <Th fontWeight="bold">Redes Sociais</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Ontem</Td>
                  <Td>{Presencial[0]}</Td>
                  <Td>{CallCenter[0]}</Td>
                  <Td>{RedesSociais[0]}</Td>
                </Tr>
                <Tr>
                  <Td>Mês</Td>
                  <Td>{Presencial[1]}</Td>
                  <Td>{CallCenter[1]}</Td>
                  <Td>{RedesSociais[1]}</Td>
                </Tr>
                <Tr>
                  <Td>Parcial</Td>
                  <Td>{Presencial[2]}</Td>
                  <Td>{CallCenter[2]}</Td>
                  <Td>{RedesSociais[2]}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}