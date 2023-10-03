import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Section } from "@/components/Section/Section";
import {Box, Button, Link, LinkProps, Table, TableCaption,  TableContainer, Tbody,  Td, Text,  Tfoot, Th,  Thead,  Tr,Select, Input } from "@chakra-ui/react";
import { data } from "autoprefixer";
import { error } from "console";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { format } from 'date-fns';
import { AtendimentoData } from "@/components/CriacaoDashboard/interfaces/AtendimentoInterface"; 


export default function Formulario() {
  const [unidades, setUnidades] = useState<Unidade[]>([]); // Inicialize o estado com um array de Unidades
  const [selectedUnidade, setSelectedUnidade] = useState<string>(""); // Inicialize com uma string vazia
  const [servicos, setServicos] = useState<any[]>([])
  const [dataAtendimento, setDataAtendimento] = useState<string>(getCurrentDate()); // Defina a data atual como valor inicial

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const exibirMSG = () => {
    const currentDate = getCurrentDate();
    
    if (dataAtendimento > currentDate) {
      alert("Erro: Você não pode cadastrar uma data futura.");
      return;
      
    } else {
      alert("Dados Inseridos");
    }
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
    async function fetchServicos() {
    try{

      const response = await api.get("/servicos");
      const data = response.data;

      if (data && data.length > 0) {
        setServicos(data);
      }
    } catch (error){
      console.error(error)
    }
  }

    fetchUnidades();
    fetchServicos()
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
      <Input type={"date"} textAlign={"center"} w={800}  margin={"auto"} bg={"#fffffff"} value={dataAtendimento} onChange={(e) => setDataAtendimento(e.target.value)}/>
    </Box>
    {servicos.map((servico, index) => (
    <Box key={index} marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        {servico.nome }
      </Text>
      <Input type={"number"} textAlign={"center"} w={800} margin={"auto"} bg={"#fffffff"} placeholder={`Quantos atendimentos de ${servico.nome} ?`}/>
    </Box>
    ))}
    <Box marginTop={"2rem"} textAlign={"center"}>
      <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
        Comentarios
      </Text>
      <Input as={"textarea"} textAlign={"center"} w={800} h={40} margin={"auto"} bg={"#fffffff"} placeholder={"Algum Comentario"}/>
    </Box>
    <Box margin={600} display={"flex"}   marginTop={"2rem"} textAlign={"center"} justifyContent={"center"}>
    <Link  margin={"auto"}  textAlign={"center"} href="cadastro/form/" p={3} bgColor={"green.400"} color={"#FFFFFF"} fontWeight={1000} onClick={exibirMSG}>
      Inserir Dados
    </Link>
    <Link margin={"auto"}  textAlign={"center"} href="cadastro/form/" p={3} bgColor={"gray.600"} color={"#FFFFFF"} fontWeight={1000} onClick={exibirMSG}>
      Cancelar
    </Link>
    </Box>
  </>
);
}