import React, { useState } from "react";
import api from "@/services/api";
import { Box, Flex } from "@chakra-ui/react";
import Select from "react-select";
import { Unidade } from "../interfaces/UnidadeInterface";
import UnidadeGrafico from "../DashboardFiltro/UnidadeGrafico";
interface FilterProps {
  setShowDashboards: React.Dispatch<React.SetStateAction<boolean>>;
}

const options1 = [
  { value: "1", label: "Geral" },
  { value: "2", label: "Unidade" },
];

function Filter({ setShowDashboards }: FilterProps) {
  const [selectedOption1, setSelectedOption1] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [unidadesData, setUnidadesData] = useState<Unidade[]>([]);
  const [selectedUnidadeId, setSelectedUnidadeId] = useState<string | null>(null);

  const handleOption1Change = async (selectedOption: {
    value: string;
    label: string;
  } | null) => {
    setSelectedOption1(selectedOption);

    if (selectedOption && selectedOption.value === "2") {
      try {
        const response = await api.get("/unidades");
        setUnidadesData(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedUnidadeId(null);
      setShowDashboards(true); // Mostra os Dashboards quando não é "Unidade"
    }
  };

  const handleOption2Change = (selectedOption: {
    value: string;
    label: string;
  } | null) => {
    setSelectedOption2(selectedOption);

    if (selectedOption) {
      setSelectedUnidadeId(selectedOption.value);
      setShowDashboards(false); // Oculta os Dashboards quando é "Unidade"
    } else {
      setSelectedUnidadeId(null);
      setShowDashboards(true); // Mostra os Dashboards quando não é "Unidade"
    }
  };

  const getUnidadesOptions = () => {
    return unidadesData.map((unidade) => ({
      value: unidade.id.toString(),
      label: unidade.nome,
    }));
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" pb={8}>
      <Select options={options1} value={selectedOption1} onChange={handleOption1Change} />

      {selectedOption1 && selectedOption1.value === "2" && (
        <>
          <Select options={getUnidadesOptions()} value={selectedOption2} onChange={handleOption2Change} />
          {selectedUnidadeId && (
            <Box style={{ width: "80%", height: "800px" }}>
              <UnidadeGrafico unidadeId={selectedUnidadeId} /> {/* Chama o componente UnidadeGrafico */}
            </Box>
          )}
        </>
      )}

      
    </Flex>
  );
}

export default Filter;
