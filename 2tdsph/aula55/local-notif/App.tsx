import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function App() {

  const schedulerNotificationHandler = () => { 
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Exemplo 1 - Notificação",
        body: "Corpo da Notificação - Exemplo 1",
        data : {"info": "informação 1"}
      },
      trigger: {
        seconds: 3,
      }
    });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return { 
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowAlert: true
      }
    }
  });

  const notificationConfig = async() => { 
    let permissions = await Notifications.getPermissionsAsync();
    if ( permissions.status !== "granted") { 
      permissions = await Notifications.requestPermissionsAsync();
    }

    if ( permissions.status !== "granted") { 
      Alert.alert("É necessária permissão para enviar notificações locais");
    }

    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    const devicePushToken = await Notifications.getDevicePushTokenAsync();

    if (Platform.OS == "android") { 
      Notifications.setNotificationChannelAsync("default",  { 
        name: "default",
        importance: Notifications.AndroidImportance.MAX
      })
    }
  }

  useEffect( ()=>{
    notificationConfig();
    const subscription = Notifications.addNotificationResponseReceivedListener( 
      ( notification )=> { 
        ToastAndroid.show("Notificação clicada", ToastAndroid.LONG);
        console.log( "Notificação clicada ==> ", notification);
      }
    );

    return ()=>{
      subscription.remove();
    }
  }, []);



  return (
    <View style={styles.container}>
      <Button title="Criar notificação 10 segundos" onPress={()=>{
        schedulerNotificationHandler();
        console.log("Notificação enviada...");
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
