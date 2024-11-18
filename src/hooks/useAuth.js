import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useAuth(){
    const [user, setUser] = useLocalStorage('loggedInUser', null);
    const [loading, setLoading] = useState(false);

    const login = async (nickname, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3333/usuarios' , {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                },
            })

            const usuarios = await response.json();
            if (response.ok && usuarios.length > 0) {
                const foundUser = usuarios.find(
                    (u) => u.nickname === nickname && u.password === password
                );
                
                if (foundUser) {
                    setUser(foundUser);
                    return {sucess: true, user: foundUser};
                } else {
                    return {sucess: false, message: 'Credenciais inválidas'};
                }
            }
            return {sucess: false, message: 'Nenhum usuário encontrado'};
        } catch (error){
            console.error('Login error:', error);
            return {sucess: false, message: 'Erro ao tentar logar'};
        } finally {
            setLoading(false);
        }
    };
    const logout = () => {
        setUser(null)
    };

    return {user, login, logout, loading};
}
