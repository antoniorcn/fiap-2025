import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as Notifications from "expo-notifications";
import { useEffect } from 'react';

export default function App() {

  const sendNotification = () => {Notifications.scheduleNotificationAsync( {
          content: {
            title: "Notificação do Hello World",
            body: "Notificação do Hello World 2TDSPH de 5 segundos",
            data: {teste: "Teste"}
          },
          trigger: {
            seconds: 15,
            // repeats: false,
            // type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL
          },
        } )};

  useEffect( ()=> {
      Notifications.setNotificationHandler( { 
          handleNotification: async() : Promise<Notifications.NotificationBehavior> => {
            return { 
              shouldPlaySound: false,
              shouldShowList: true,
              shouldSetBadge : true,
              shouldShowBanner: true
            }
        }});
      // const notificationListener = Notifications.addNotificationReceivedListener( 
      //   ( notification ) => { 
      //     console.log("Notificação recebida");
      //     ToastAndroid.show( "Notificação clicada", ToastAndroid.LONG);
      //     console.log( notification );
      //   }
      // );        
      const subscription = Notifications.addNotificationResponseReceivedListener( 
        ( notification ) => { 
          ToastAndroid.show( "Notificação clicada", ToastAndroid.LONG);
          console.log( notification );
        }
      );
      return ()=> {
        console.log("Listeners removidos da memória");
        // notificationListener.remove();
        subscription.remove();
      }
  }, []);

  

  return (
    <View style={styles.container}>
      <Text> Hello World 2TDSPH </Text>
      <StatusBar style="auto" />
      <Button title="Notificar 5 seg" onPress={()=>{
        sendNotification();
        console.log("Notificação enviada");
      }}/>
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
