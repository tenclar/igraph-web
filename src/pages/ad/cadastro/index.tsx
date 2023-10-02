import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Section } from "@/components/Section/Section";
import {Box, Button, Link, LinkProps, Table, TableCaption,  TableContainer, Tbody,  Td, Text,  Tfoot, Th,  Thead,  Tr,Select, Input } from "@chakra-ui/react";
import { data } from "autoprefixer";
import { error } from "console";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";


export default function Formulario() {
  const [unidades, setUnidades] = useState<Unidade[]>([]); // Inicialize o estado com um array de Unidades
  const [selectedUnidade, setSelectedUnidade] = useState<string>(""); // Inicialize com uma string vazia
  
  const exibirMSG = () => {
    const mensagem = "Dados Inseridos"
    alert(mensagem)
  }

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await api.get("/unidades");
        const data = response.data;

        if (data && data.length > 0) {
          setSelectedUnidade(data[0].nome); // Defina a primeira unidade como padrão
        }
        setUnidades(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUnidades();
  }, []);

  return (
    <>
    <HeaderAdmin />
    <Text marginTop={"6rem"} textAlign={"center"} fontSize={"2.3rem"} fontWeight={"800"}>
      Inserir Atendimento
    </Text>
    <Box marginTop={"3rem"}>
      <Text textAlign={"center"} fontSize={"1.2rem"} fontStyle={"italic"} fontWeight={"800"}>
        Central
      </Text>
      <Select w={800} textAlign={"center"} margin={"auto"} bg={"#ffffff"} value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)}>
      {unidades.map((unidade, index) => (
            <option key={index} value={unidade.nome}>
              {unidade.nome}
            </option>
          ))}
      </Select>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Data de Atendimento
      </Text>
      <Input type={"date"} textAlign={"center"} w={800}  margin={"auto"} bg={"#fffffff"} />
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Atendimento Chat
      </Text>
      <Input type={"number"}  textAlign={"center"} w={800} margin={"auto"} bg={"#fffffff"} placeholder={"Quantos atendimentos de Chat ?"}/>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Atendimento Presenciais
      </Text>
      <Input type={"number"} textAlign={"center"} w={800} margin={"auto"} bg={"#fffffff"} placeholder={"Quantos atendimentos Presenciais ?"}/>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Atendimento Call Center
      </Text>
      <Input type={"number"} textAlign={"center"} w={800} margin={"auto"} bg={"#fffffff"} placeholder={"Quantos atendimentos de Call Center ?"}/>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Atendimento Redes Sociais
      </Text>
      <Input type={"number"} textAlign={"center"} w={800} margin={"auto"} bg={"#fffffff"} placeholder={"Quantos atendimentos de Redes Sociais ?"}/>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Comentarios
      </Text>
      <Input as={"textarea"} textAlign={"center"} w={800} h={40} margin={"auto"} bg={"#fffffff"} placeholder={"Algum Comentario"}/>
    </Box>
    <Box marginTop={"2rem"} textAlign={"center"}>
    <Link margin={"auto"} textAlign={"center"} href="cadastro/form/" p={3} bgColor={"green.400"} color={"#FFFFFF"} fontWeight={1000} onClick={exibirMSG}>
      Inserir Dados
    </Link>
    </Box>
  </>
);
}