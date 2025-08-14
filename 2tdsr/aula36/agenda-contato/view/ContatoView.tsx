import {View, Text, Button, TextInput, ActivityIndicator, Modal} from 'react-native';
import { useContatoControl } from '../control/contatoControl';

interface ContatoViewProps { 
    
}

const ContatoView : React.FC<ContatoViewProps> = () => { 
    const { loading, contato, handlerInput, salvar, mensagem} = useContatoControl();
    return (
        <View style={{flex: 1}}>
            <Text>Nome:</Text>
            <TextInput value={contato.nome}
                onChangeText={(txt:string)=>handlerInput(txt, "nome")}/>
            <Text>Telefone:</Text>
            <TextInput value={contato.telefone} 
                onChangeText={(txt:string)=>handlerInput(txt, "telefone")}/>
            <Text>Email:</Text>
            <TextInput value={contato.email} 
                onChangeText={(txt:string)=>handlerInput(txt, "email")}/>
            <Button title="Salvar" onPress={salvar} />
            <Text style={{color: "red", fontSize: 24}}>{mensagem}</Text>
            <Modal visible={loading}>
                <ActivityIndicator/>
            </Modal>
        </View>
    );

    // const { contato, setContato, salvar} = useContatoControl();
    // return (
    //     <View style={{flex: 1}}>
    //         <Text>Nome:</Text>
    //         <TextInput value={contato.nome}
    //             onChangeText={(texto: string) => {
    //                 const novoContato = {...contato, nome: texto};
    //                 setContato( novoContato );
    //             }}/>
    //         <Text>Telefone:</Text>
    //         <TextInput value={contato.telefone} 
    //             onChangeText={
    //                 (texto: string)=>setContato({...contato, telefone: texto})}/>
    //         <Text>Email:</Text>
    //         <TextInput value={contato.email} onChangeText={
    //                 (texto: string)=>setContato({...contato, email: texto})}/>
    //         <Button title="Salvar" onPress={salvar} />
    //     </View>
    // );
}

export default ContatoView;