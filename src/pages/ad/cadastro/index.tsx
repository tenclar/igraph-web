import { Footer } from "@/components/Form/Footer";
import { HeaderAdmin } from "@/components/Form/HeaderAdmin";
import { Section } from "@/components/Section/Section";
import { Box, Button, Input, Select, Text, Textarea,} from "@chakra-ui/react";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Unidade } from "@/components/CriacaoDashboard/interfaces/UnidadeInterface";
import { type } from "os";

export default function Formulario() {
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [selectedUnidade, setSelectedUnidade] = useState<Unidade | null>(null);
  const [servicos, setServicos] = useState<any[]>([]);
  const [dataAtendimento, setDataAtendimento] = useState<string>(
    getCurrentDate()
  );
  const [comentario, setComentario] = useState<string>("");
  const [totalAtendimentos, setTotalAtendimentos] = useState<number>(0);

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
      }
    }

    async function fetchServicos() {
      try {
        const response = await api.get("/servicos");
        const data = response.data;

        if (data && data.length > 0) {
          setServicos(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUnidades();
    fetchServicos();
  }, []);

  // Função para enviar os dados para o servidor
  async function inserirDadosNoBanco() {
    try {
      // Calcular a quantidade somando os valores dos serviços
      const quantidade = servicos.reduce(
        (acumulador, servico) => acumulador + (servico.quantidade || 0),
        0
      );
      type FormDataProps = {
        quantidade: number;
        comentarios: string;
        data_de_atedimento: Date;

      }



      // Preencher os dados para inserção
      const dadosParaInserir = {
        comentarios: comentario,
        data_de_atendimento: dataAtendimento,
        quantidade: quantidade,
        servicos_id: 1,
        unidades_id: selectedUnidade?.id || null, // ID da unidade escolhida
        usuarios_id: 1, // Manter como nulo por enquanto
      };
      
      // Enviar os dados para o servidor
      console.log(dadosParaInserir)
       const response = await api.post("/atendimentos", dadosParaInserir);

      if (response.status === 200) {
        alert("Dados inseridos com sucesso!");
      } else {
        alert("Ocorreu um erro ao inserir os dados no banco.");
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
      {servicos.map((servico, index) => (
        <Box key={index} marginTop={"2rem"} textAlign={"center"}>
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
            onChange={(e) => {
              const valor = parseInt(e.target.value);
              if (!isNaN(valor)) {
                const novosValores = [...servicos];
                novosValores[index].quantidade = valor;
                setServicos(novosValores);
                const soma = novosValores.reduce(
                  (acumulador, servico) =>
                    acumulador + (servico.quantidade || 0),
                  0
                );
                setTotalAtendimentos(soma);
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
        margin={600}
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
          onClick={() => {
            const mensagem = `Central: ${selectedUnidade?.nome || ""}\nData de Atendimento: ${dataAtendimento}\nTotal de Atendimentos: ${totalAtendimentos}\nComentário: ${comentario}`;
            alert(mensagem);
            inserirDadosNoBanco();
          }}
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
    </>
  );
}
