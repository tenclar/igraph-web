import React, { useState } from "react";
import { Input, Button, VStack, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LogoOca from "../../components/assets/oca_logo_verde.png";
import api from "@/services/api";

const imageStyles = {
  width: "400px",
  height: "200px",
};

interface User {
  id: number;
  nome : string;
  nickname: string;
  password: string;
}

// Função para setar o usuário na sessão
export const setSessionUser = (user: User) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const getSessionUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userString = localStorage.getItem('loggedInUser');
    return userString ? JSON.parse(userString) : null;
  }
  return null;
};


export function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const router = useRouter();
  
  // Função para obter o usuário da sessão 


  const handleLogin = async () => {
    try {
      const response = await api.post("/sessions", {
        nickname,
        password
      });

      const {token, user} = response.data

      localStorage.setItem("@Igraph:token", token)
      localStorage.setItem("@Igraph:user", JSON.stringify(user))

      api.defaults.headers.authorization = "Bearer ${token}";

      setMessage("Usuario autorizado");
      router.push("/ad")
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setMessage("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <Box>
      <Box
        alignItems={"center"}
        marginTop={"8rem"}
        mx={"auto"}
        textAlign={"center"}
        h={200}
        w={400}
      >
        <img src={LogoOca.src} alt="LogoOca" style={imageStyles} />
      </Box>
      <Text textAlign={"center"}>
        Sistema Eletrônico de Relatório de Atendimentos
      </Text>
      <VStack spacing={4} align="center" mt={8}>
        <Input
          placeholder="Usuário"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          w={400}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          w={400}
        />
        <Button colorScheme="green" onClick={handleLogin}>
          Entrar
        </Button>
        <Text color="red">{message}</Text> {/* Adiciona cor vermelha à mensagem */}
      </VStack>
    </Box>
  );
}
