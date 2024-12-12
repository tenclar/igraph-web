import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  Select,
  Text
} from "@chakra-ui/react";
import api from '@/services/api';

interface EditPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    nome: string;
    email:string;
    nickname: string;
    password: string;
    nivel: boolean;
    status: boolean;
  };
  onSave: (editedLogin: {
    id: number;
    nome: string;
    email: string;
    nickname: string;
    password: string;
    nivel: boolean;
    status: boolean;
  }) => void;
}



const EditarLoginModal: React.FC<EditPerfilModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [editedLoginData, setEditedLoginData] = useState({
    nickname: user.nickname,
    email: user.email,
    password: "",
    confirmPassword: "",
    
  });

  const [passwordMsg, setPasswordMsg] = useState("");
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name , value } = e.target;
    setEditedLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {

    //VERIFICAR SE SENHA BATEU
    if(editedLoginData.password !== editedLoginData.confirmPassword) {
      setPasswordMsg("As senhas não coiciedem");
      return;
    } else {
      setPasswordMsg("As senhas coicidem")
    }

    try {
      const response = await api.put(`/usuarios/${user.id}`, {
        nickname: editedLoginData.nickname,
        password: editedLoginData.password,
        
      });
      
      console.log('API Response:', response);

      onSave({
        ...user,
        nickname: editedLoginData.nickname,
        password: editedLoginData.password,
      });

      onClose();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent borderRadius={8} border={"2px solid"} >
        <ModalHeader textAlign={"center"} color={"#fff"} backgroundColor={"gray.400"} borderRadius={8}>Editar Login do Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            
            <Input
              textAlign={"center"}
              type='nickname'
              placeholder="Nickname"
              name="nickname"
              value={editedLoginData.nickname}
              onChange={handleInputChange}
            />
            
            <Input
              textAlign={"center"}
              type="password"
              placeholder="Senha"
              name="password"
              value={editedLoginData.password}
              onChange={handleInputChange} 
            />
            <Input
              textAlign={"center"}
              type="password"
              placeholder="Confirme a Senha"
              name="confirmPassword"
              value={editedLoginData.confirmPassword}
              onChange={handleInputChange}  
            />
            {passwordMsg && (
              <Text color={passwordMsg.includes("não coicidem") ? "red.500" : "red.500"}>
                {passwordMsg}
              </Text>)} 
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditarLoginModal;
