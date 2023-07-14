import { Flex, SimpleGrid, Text, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface listaAtendimentos {
    ano:number;
}

const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const options = {
    labels: ["Rio Branco", "Cruzeiro", "Xapuri"],
    legend: {
        position: "left",
        markers: {
            width: "20px",
            shape: "square",
            radius: 4,
        }
    }
};

const series = [300, 25, 50];

export default function Dashboard() {
    const [ listaAdtendimentosAno, setListaAdtendimentosAno ] = useState<listaAtendimentos[]>[[]]; 


    

    return (
        <>
        
        <Flex direction="column" h="100vh">
            <SimpleGrid flex={1} gap={4} minChildWidth="320px" alignItems="flex-start">
                <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
                    <Text fontSize="2xl" mb={4}>
                        Todas as Centrais
                    </Text>
                    <Chart options={options} series={series} type="pie" height={300} />                
                </Box>
                <Box p={8} bg="gray.100" borderRadius={8} pb={4}>
                    <Text fontSize="2xl" mb={4}>
                        Estatística de atendimento
                        <p>estatistica1</p>
                        <p>estatistica2</p>
                    </Text>
                </Box>
            </SimpleGrid>
        </Flex>
        </>
    );
}
