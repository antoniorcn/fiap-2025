import { useState } from "react"


const useAppControl = () => { 
    const [token, setToken] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);

    const fecharSessao = () => { 
        setToken( null );
        setEmail( null );
    }

    const abrirSessao = (tokenSessao : string, emailSessao : string) => { 
        setToken(tokenSessao);
        setEmail(emailSessao);
    }

    return { token, setToken, email, setEmail, fecharSessao, abrirSessao }
}

export { useAppControl }