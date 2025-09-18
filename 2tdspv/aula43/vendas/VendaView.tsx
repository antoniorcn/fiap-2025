import { View, Text, TextInput, Button } from 'react-native';
import { useVendaControl } from './vendaControl';

type VendaViewProps = {
    corFundo : string
}

const VendaView : React.FC<VendaViewProps> = ( props ) => { 

    const {titulo, setTitulo, preco, setPreco, 
        salvar, status, erros } = useVendaControl();

    return ( 
        <View style={{flex: 1, 
            backgroundColor: props.corFundo}}>
            <Text>Vendas</Text>
            <Text>Titulo</Text>
            <TextInput value={titulo} onChangeText={setTitulo} />
            <Text style={{color: "red"}}>{erros.titulo}</Text>
            <Text>Preco</Text>
            <TextInput value={preco} onChangeText={setPreco}/>
            <Text style={{color: "red"}}>{erros.preco}</Text>
            <Button title="Gravar" onPress={salvar}/>
            <Text>{status}</Text>
        </View>
    )
}

export default VendaView;