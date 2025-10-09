import {View, Text, Button } from 'react-native';
import { useProfileControl } from '../control/profileControl';

interface ProfileProps { 

}

const ProfileView : React.FC<ProfileProps> = () => {
    const {emailProfile, logout } = useProfileControl();
    return ( 
        <View style={{flex: 1}}>
            <Text style={{fontSize: 28, fontWeight: "bold"}}>Login</Text>
            <Text>Email: {emailProfile}</Text>
            <Button title="Logout" onPress={logout} />
        </View>   
    )
}

export {ProfileView};