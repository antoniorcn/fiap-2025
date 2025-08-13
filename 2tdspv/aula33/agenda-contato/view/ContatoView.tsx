import {View, Text, TextInput, Button} from 'react-native';
import {useContatoControl} from '../control/contatoControl';
const ContatoView = () => { 
    const {contato, handleInput, salvar} = useContatoControl();
    return (
        <View>
            <Text>Agenda de Contato</Text>
            <Text>Nome: </Text>
            <TextInput value={contato.nome} 
                onChangeText={(texto)=>handleInput(texto, "nome")}/>
            <Text>Email: </Text>
            <TextInput value={contato.email} 
                onChangeText={(txt)=>handleInput(txt, "email")}/>
            <Text>Telefone: </Text>
            <TextInput value={contato.telefone} 
                onChangeText={(txt)=>handleInput(txt, "telefone")}/>
            <Button title="Salvar" onPress={salvar}/>
        </View>
    );

    // const {contato, setContato, salvar} = useContatoControl();
    // return (
    //     <View>
    //         <Text>Agenda de Contato</Text>
    //         <Text>Nome: </Text>
    //         <TextInput value={contato.nome} 
    //             onChangeText={(txt)=>setContato({...contato, nome: txt})}/>
    //         <Text>Email: </Text>
    //         <TextInput value={contato.email} 
    //             onChangeText={(txt)=>setContato({...contato, email: txt})}/>
    //         <Text>Telefone: </Text>
    //         <TextInput value={contato.telefone} 
    //             onChangeText={(txt)=>setContato({...contato, telefone: txt})}/>
    //         <Button title="Salvar" onPress={salvar}/>
    //     </View>
    // )    

    // const {nome, setNome,
    //     email, setEmail,
    //     telefone, setTelefone, 
    //     salvar} = useContatoControl();
    // return (
    //     <View>
    //         <Text>Agenda de Contato</Text>
    //         <Text>Nome: </Text>
    //         <TextInput value={nome} onChangeText={setNome}/>
    //         <Text>Email: </Text>
    //         <TextInput value={email} onChangeText={setEmail}/>
    //         <Text>Telefone: </Text>
    //         <TextInput value={telefone} onChangeText={setTelefone}/>
    //         <Button title="Salvar" onPress={salvar}/>
    //     </View>
    // )
}

export default ContatoView;