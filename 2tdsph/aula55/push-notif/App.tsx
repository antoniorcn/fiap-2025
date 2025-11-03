import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';
import Constants from 'expo-constants';

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
    if (Device.isDevice) {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      let permissions = await Notifications.getPermissionsAsync();
      if ( permissions.status !== "granted") { 
        permissions = await Notifications.requestPermissionsAsync();
      }

      if ( permissions.status !== "granted") { 
        Alert.alert("É necessária permissão para enviar notificações locais");
        return;
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      console.log("Project ID: ", projectId);
      if (!projectId) {
        console.error('Project ID not found');
        return;
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log("Push token: ", pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        console.error(`${e}`);
      }
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
      <Button title="Notificação Config" onPress={()=>notificationConfig()}/>
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
