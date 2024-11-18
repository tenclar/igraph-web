import { useEffect, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth'; // Importando o hook personalizado de autenticação

export default function Home() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth(); // Utilizando `login` do hook `useAuth`
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/ad'); // Redireciona caso o usuário já esteja logado
    }
  }, [user, router]);

  const handleLogin = async () => {
    const result = await login(nickname, password);
    if (result.sucess) {
      toast({
        title: 'Login Successful',
        description: 'Usuário autorizado! Bem-vindo!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/ad');
    } else {
      toast({
        title: 'Login Failed',
        description: result.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Igraph Web 3.0
      </Heading>
      <FormControl mb={4} textAlign="center">
        <FormLabel fontSize="larger">Usuário:</FormLabel>
        <Input
          type="text"
          width="60%"
          placeholder="Usuário"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </FormControl>
      <FormControl mb={4} textAlign="center">
        <FormLabel fontSize="larger">Senha:</FormLabel>
        <Input
          type="password"
          width="60%"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Box display="flex" justifyContent="center">
        <Button
          margin="10px"
          width="40%"
          height="40px"
          colorScheme="blue"
          backgroundColor="green"
          cursor="pointer"
          color="#fff"
          borderRadius="15px"
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Box>
      <Box textAlign="center" mt={4}>@Detin</Box>
    </Box>
  );
}
