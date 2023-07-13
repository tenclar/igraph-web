import React from 'react';
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
    { value: '4', label: 'Xapuri'},
    { value: '5', label: 'Brasileia'}
];

function Filter() {
    return (
        <Flex direction="row" alignItems="center" justifyContent="center">
            <Select options={options1} />
            <Select options={options2} />
        </Flex>
    );
}

export default Filter;
