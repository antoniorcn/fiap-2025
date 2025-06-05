import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    contato_item : {
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 10,
      backgroundColor: "lightyellow",
      margin: 10,
      padding: 10
    },
    input : { 
      borderWidth: 1,
      borderColor: 'red',
      backgroundColor: 'lightcyan',
      borderRadius: 16,
      paddingHorizontal: 15,
      paddingVertical: 5,
      margin: 10,
      alignSelf: 'stretch'
    }
  });

  export { styles };