import api from '@/services/api';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Select from 'react-select';
import { UnidadeData } from '../DashboardPrincipal/principal';
import DashboardUnidade from '../CriacaoDashboard/Dashboards';

const options1 = [
  { value: '1', label: 'Geral' },
  { value: '2', label: 'Unidade' },
];

function Filter() {
  const [selectedOption1, setSelectedOption1] = useState<{ value: string; label: string } | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<{ value: string; label: string } | null>(null);
  const [unidadesData, setUnidadesData] = useState<UnidadeData[]>([]);
  const [selectedUnidade, setSelectedUnidade] = useState<string | null>(null); // Estado para rastrear a unidade selecionada

  const handleOption1Change = async (selectedOption: { value: string; label: string } | null) => {
    setSelectedOption1(selectedOption);

    // Se a opção selecionada for "Unidade", faz a requisição para a rota de unidades
    if (selectedOption && selectedOption.value === '2') {
      try {
        const response = await api.get('/unidades'); // Substitua "/unidades" pelo endpoint correto da sua API
        setUnidadesData(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Limpe a unidade selecionada se a opção não for "Unidade"
      setSelectedUnidade(null);
    }
  };

  const handleOption2Change = (selectedOption: { value: string; label: string } | null) => {
    setSelectedOption2(selectedOption);

    // Atualize o estado da unidade selecionada com base na opção do segundo Select
    if (selectedOption) {
      setSelectedUnidade(selectedOption.value);
    } else {
      setSelectedUnidade(null);
    }
  };

  // Função para obter as opções corretas para o segundo Select
  const getUnidadesOptions = () => {
    return unidadesData.map((unidade) => ({ value: unidade.id.toString(), label: unidade.nome }));
  };

  return (
    <>
    <Flex direction="column" alignItems="center" justifyContent="center" pb={8}>
      <Select options={options1} value={selectedOption1} onChange={handleOption1Change} />

      {selectedOption1 && selectedOption1.value === '2' && (
        <Select options={getUnidadesOptions()} value={selectedOption2} onChange={handleOption2Change}  />
      )}
      
      {selectedUnidade && (
        <div className={`selectedUnidade ${selectedUnidade === 'todos' ? '' : 'highlight'}`}>
          Unidade selecionada: {selectedUnidade}
        </div>
      )}
      
      <br />
     
    </Flex>
  </>
  );
}

export default Filter;
