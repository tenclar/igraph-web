import React, { useState } from "react";
import { Input, Button, VStack, Text, Box } from "@chakra-ui/react";
import LogoOca from "../../components/assets/oca_logo_verde.png"
import api from "@/services/api";


const imageStyles = {

  width: "400px",
  height: "200px",
};



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    // Aqui você pode verificar as credenciais, mas por enquanto, vamos apenas mostrar uma mensagem
    setMessage(
      `Tentativa de login para usuário: ${username}, senha: ${password}`
    );
  };

  
  return (
    <Box>
      <Box alignItems={"center"} marginTop={"8rem"} mx={"auto"} textAlign={"center"} h={200} w={400}>
          <img src={LogoOca.src} alt="LogoOca" style={imageStyles} />
        </Box>
        <Text textAlign={"center"}>Sistema Eletronico de Relatorio de Atendimentos</Text>
      <VStack spacing={4} align="center" mt={8}>
        <Input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
}
