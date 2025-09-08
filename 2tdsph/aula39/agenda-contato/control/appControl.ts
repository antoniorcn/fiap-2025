import { useEffect, useState } from "react"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const useAppControl = () => {
    const [token, setTokenState] = useState<string | null>(null);
    const [emailProfile, setEmailProfileState] = useState<string | null>(null);
    const {setItem, getItem} = useAsyncStorage("PROFILE");

    const setProfile = ( tokenValue : string | null, emailValue : string | null) => { 
        setTokenState(tokenValue);
        setEmailProfileState(emailValue);

        setItem( JSON.stringify({tokenValue, emailValue}) )
    }

    useEffect(
        () => {
            console.log("useEffect() appControl executado")
            getItem()
            .then(( dados : string | null)=>{
                if (dados != null) {
                    const obj = JSON.parse(dados);
                    setProfile( obj.tokenValue, obj.emailValue );
                    console.log("appControl() profile definido");
                    console.log(`email: ${obj.emailValue} profile definido`);
                }
            })
            .catch(()=>{ 
                console.log("Erro ao carregar os dados do AsyncStorage");
            }) 
        },
        []
    );





    return { token, emailProfile, setProfile };

}

export { useAppControl };