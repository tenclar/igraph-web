import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Box, Button, Text, useDisclosure, Select, Input } from "@chakra-ui/react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function GerarPlanilha() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);
  const [unidades, setUnidades] = useState<Unidade[]>([]);

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await api.get("/unidades");
        const data = response.data;

        if (data && data.length > 0) {
          setSelectedUnidade(data[0]); // Seleciona a primeira unidade como padrão
        }
        setUnidades(data);
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao buscar as unidades.");
      }
    }

    fetchUnidades(); // Chame a função fetchUnidades para buscar as unidades ao montar o componente
  }, []); // Adicione um array vazio como segundo argumento para garantir que o useEffect execute apenas uma vez

  return (
    <>
      <HeaderAdmin />
      <Text marginTop={"5rem"} textAlign={"center"} fontSize={"4xl"} fontWeight="800">
         Planilha iGraph2
      </Text>
      <Box mx="auto" mt={7} textAlign={"center"} fontSize="1rem" fontWeight="bold" maxW="175vh" h="60vh" overflowY="scroll">
        <Text>Data de Início</Text>
        <Input
          type={"date"}
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          bg={"#fffffff"}
        />
        <Text mt={3}>Data de Fim</Text>
        <Input
          type={"date"}
          textAlign={"center"}
          maxW={200}
          margin={"auto"}
          bg={"#fffffff"}
        />
        <Text fontSize={"2xl"} mt={2}>Central:</Text>
        <Select textAlign={"center"} maxW={200} margin={"auto"} backgroundColor={"#fff"}>
          {/* Mapeie as unidades disponíveis no Select */}
          {unidades.map((unidade) => (
            <option key={unidade.id} value={unidade.id}>
              {unidade.nome}
            </option>
          ))}
        </Select>
        
        <Button margin={5} w={200} h={100} backgroundColor={"green.500"} color={"#fff"} border=".125rem solid #000000" onClick={onOpen}>
          Gerar Planilha
        </Button>
        <Button w={200} margin={15} h={100} backgroundColor={"blue.500"} color={"#fff"} border=".125rem solid #000000" onClick={() => window.location.href = "/ad/gerenciarUsuarios/visualizarPlanilha"} >
          Visualizar Planilha
        </Button>
      </Box>
      <Footer />
    </>
  );
}
