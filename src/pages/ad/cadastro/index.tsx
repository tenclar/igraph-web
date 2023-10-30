import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Section } from "@/components/Section/Section";
import { Box, Button, Input, Select, Text, Textarea } from "@chakra-ui/react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { Servico } from "@/components/CriacaoDashboard/interfaces/ServicosInterface";
import { Comentarios } from "@/components/CriacaoDashboard/interfaces/ComentarioInterface";


export default function Formulario() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);
  const [servicos, setServicos] = useState<any[]>([]);
  const [dataAtendimento, setDataAtendimento] = useState<string>(
    getCurrentDate()
  );
  const [comentarios, setComentario] = useState<string>("");

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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

    async function fetchServicos() {
      try {
        const response = await api.get("/servicos");
        const data = response.data;

        if (data && data.length > 0) {
          const servicosComID = data.map((servico: Servico, index: number) => ({
            ...servico,
            id: index + 1,
            quantidade: 0, // Adicione a quantidade inicial como 0
          }));
          setServicos(servicosComID);
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao buscar os serviços.");
      }
    }

    fetchUnidades();
    fetchServicos();
  }, []);

  async function inserirDadosNoBanco() {
    
    try {
      const atendimentos = servicos
        .filter((servico) => servico.quantidade > 0)
        .map((servico) => ({
          comentarios: comentarios,
          data_de_atendimento: dataAtendimento,
          quantidade: servico.quantidade,
          servicos_id: servico.id,
          unidades_id: selectedUnidade?.id || null,
          usuarios_id: 1,
        }));
  
      for (const atendimento of atendimentos) {
        console.log("Inserindo atendimento no banco:", atendimento);
        const responseAtendimento = await api.post("/atendimentos", atendimento);
        
        if (responseAtendimento.status === 201) {
          const atendimentoID = responseAtendimento.data.id;
          console.log("Atendimento inserido com sucesso. ID:", atendimentoID);
          console.log("Resposta da criação de atendimento:", responseAtendimento);
  
          const novoComentario: Comentarios = {
            comentarios: comentarios,
            atendimentos_id: atendimentoID,
          };
  
          console.log("Inserindo comentário no banco:", novoComentario);
  
          // Adicione um log aqui para verificar se a linha acima está sendo executada
          console.log("Logo antes do api.post('/comentarios')");
  
          const responseComentario = await api.post("/comentarios", novoComentario);
  
          // Adicione um log aqui para verificar se a linha acima está sendo executada
          console.log("Logo após o api.post('/comentarios')");
  
          console.log("Resposta da inserção de comentário:", responseComentario);
  
          if (responseComentario.status === 201) {
            console.log("Comentário inserido com sucesso.");
            alert("Dados inseridos com sucesso!");
          } else {
            console.log("Ocorreu um erro ao inserir o comentário no banco.");
            alert("Ocorreu um erro ao inserir o comentário no banco.");
          }
        } else {
          console.log("Ocorreu um erro ao inserir o atendimento no banco.");
          alert("Ocorreu um erro ao inserir o atendimento no banco.");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao inserir os dados no banco.");
    }
  }
  
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
        <Select
          w={800}
          textAlign={"center"}
          margin={"auto"}
          bg={"#ffffff"}
          value={selectedUnidade?.nome || ""}
          onChange={(e) => {
            const selectedUnit = unidades.find(
              (unit) => unit.nome === e.target.value
            );
            setSelectedUnidade(selectedUnit || null);
          }}
        >
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
        <Input
          type={"date"}
          textAlign={"center"}
          w={800}
          margin={"auto"}
          bg={"#fffffff"}
          value={dataAtendimento}
          onChange={(e) => setDataAtendimento(e.target.value)}
        />
      </Box>
      {servicos.map((servico) => (
        <Box key={servico.id} marginTop={"2rem"} textAlign={"center"}>
          <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
            {servico.nome}
          </Text>
          <Input
            type={"number"}
            textAlign={"center"}
            w={800}
            margin={"auto"}
            bg={"#fffffff"}
            placeholder={`Quantos atendimentos de ${servico.nome} ?`}
            value={servico.quantidade}
            onChange={(e) => {
              const valor = parseInt(e.target.value);
              if (!isNaN(valor)) {
                setServicos((prevServicos) =>
                  prevServicos.map((item) =>
                    item.id === servico.id ? { ...item, quantidade: valor } : item
                  )
                );
              }
            }}
          />
        </Box>
      ))}
      <Box marginTop={"2rem"} textAlign={"center"}>
        <Text fontSize={"1.2rem"} fontWeight={"800"} fontStyle={"italic"}>
          Comentários
        </Text>
        <Textarea
          textAlign={"center"}
          w={800}
          h={40}
          margin={"auto"}
          bg={"#fffffff"}
          placeholder={"Algum Comentário"}
          onChange={(e) => setComentario(e.target.value)}
        />
      </Box>
      <Box
        margin={40}
        display={"flex"}
        marginTop={"2rem"}
        textAlign={"center"}
        justifyContent={"center"}
      >
        <Button
          margin={"auto"}
          textAlign={"center"}
          p={3}
          bgColor={"green.400"}
          color={"#FFFFFF"}
          fontWeight={1000}
          onClick={inserirDadosNoBanco}
        >
          Inserir Dados
        </Button>
        <Button
          margin={"auto"}
          textAlign={"center"}
          p={3}
          bgColor={"gray.600"}
          color={"#FFFFFF"}
          fontWeight={1000}
          
        >
          Cancelar
        </Button>
      </Box>
      <Footer/>
    </>
  );
}
