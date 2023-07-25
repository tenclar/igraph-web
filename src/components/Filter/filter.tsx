import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import Select from 'react-select';
import api from '@/services/api';
import { UnidadeData } from '../Dashboard/dashboard';

const options1 = [
  { value: '1', label: 'Geral' },
  { value: '2', label: 'Unidade' },
];

function Filter() {
  const [selectedOption1, setSelectedOption1] = useState<{ value: string; label: string } | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<{ value: string; label: string } | null>(null);
  const [unidadesData, setUnidadesData] = useState<UnidadeData[]>([]);

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
    }
  };

  const handleOption2Change = (selectedOption: { value: string; label: string } | null) => {
    setSelectedOption2(selectedOption);
  };

  // Função para obter as opções corretas para o segundo Select
  const getUnidadesOptions = () => {
    return unidadesData.map((unidade) => ({ value: unidade.id.toString(), label: unidade.nome }));
  };

  return (
    <Flex direction="row" alignItems="center" justifyContent="center">
      <Select options={options1} value={selectedOption1} onChange={handleOption1Change} />

      {selectedOption1 && selectedOption1.value === '2' && (
        <Select options={getUnidadesOptions()} value={selectedOption2} onChange={handleOption2Change} />
      )}
      
      <br />
      2020 / 2021 / 2022
    </Flex>
  );
}

export default Filter;