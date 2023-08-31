/*import React from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Unidade } from "./Dashboards";
/*
interface UnidadeCardProps {
  unidade: Unidade;
  presencialData: number[];
  callCenterData: number[];
  redesSociaisData: number[];
}

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const UnidadeCard: React.FC<UnidadeCardProps> = ({
  unidade,
  presencialData,
  callCenterData,
  redesSociaisData,
}) => {
  const options: ApexOptions = {
    // Defina as opções do gráfico aqui...
  };

  return (
    <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
      <Box fontSize="2xl" mb={4}>
        <h1>{unidade.nome}</h1>
        <p>Desde 01 de Dezembro de 2022</p>
      </Box>
      <Chart
        options={options}
        series={presencialData}
        type="pie"
        height={300}
      />
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th fontWeight="bold">Período</Th>
            <Th fontWeight="bold">Presencial</Th>
            <Th fontWeight="bold">Call Center</Th>
            <Th fontWeight="bold">Redes Sociais</Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  );
};

export default UnidadeCard;
*/