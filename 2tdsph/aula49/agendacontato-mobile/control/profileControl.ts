import { useNavigation } from "@react-navigation/native";
import { useContext } from "react"
import { RootScreenNavigationProp } from "../navigation/navigationParams";
import { ContextoPrincipal } from "../contexto/contextoPrincipal";

const useProfileControl = () => {
    const navigation = useNavigation<RootScreenNavigationProp>();
    const {token, emailProfile, setProfile} = useContext(ContextoPrincipal);

    const logout = () => { 
        setProfile( undefined, null );
        navigation.navigate("Login");
    }
    return { token, emailProfile, setProfile, logout };
}

export { useProfileControl };