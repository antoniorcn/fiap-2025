import {View, Text, Button, TextInput} from 'react-native';
import { useContatoControl } from '../control/contatoControl';

interface ContatoViewProps { 
    
}

const ContatoView : React.FC<ContatoViewProps> = () => { 
    const { nome, setNome, email, setEmail,
            telefone, setTelefone,
            salvar} = useContatoControl();
    return (
        <View style={{flex: 1}}>
            <Text>Nome:</Text>
            <TextInput value={nome} onChangeText={setNome}/>
            <Text>Telefone:</Text>
            <TextInput value={telefone} onChangeText={setTelefone}/>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail}/>
            <Button title="Salvar" onPress={salvar} />
        </View>
    );
}

export default ContatoView;