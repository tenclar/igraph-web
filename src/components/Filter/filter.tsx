import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Select from 'react-select';

const options1 = [
  { value: '1', label: 'Geral' },
  { value: '2', label: 'Unidade' },
];

const options2 = [
  { value: '1', label: 'Todos' },
  { value: '2', label: 'Rio branco' },
  { value: '3', label: 'Cruzeiro do Sul' },
  { value: '4', label: 'Xapuri' },
  { value: '5', label: 'Brasileia' },
  { value: '6', label: 'Movel' },
];

function Filter() {
  const [selectedOption1, setSelectedOption1] = useState(null);

  const handleOption1Change = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  return (
    <Flex direction="row" alignItems="center" justifyContent="center">
      <Select options={options1} value={selectedOption1} onChange={handleOption1Change} />

      { selectedOption1 && selectedOption1.value === '2' && (
        <Select options={options2} />
      )
      }

      <br />
      2020 / 2021 / 2022
    </Flex>
  );
}

export default Filter;
