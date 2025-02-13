import React from 'react';
import {View, Text} from 'react-native';

function Principal() {
  return React.createElement(View, {"style": {"flex": 1, "backgroundColor": "yellow"}},
      React.createElement(Text, {}, "Ola mundo"));
  
  // return (
    /* <View style={{backgroundColor : "yellow"}}>
      <Text> Hello World </Text>
    </View> */
  // );
}

export default Principal;
