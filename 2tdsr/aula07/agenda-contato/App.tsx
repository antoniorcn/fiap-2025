import React from 'react';
import {Alert, Switch, Image, Text, View, Button} from "react-native";
import imageDog from "./assets/puppy.jpg";

export default () => { 
  return (
    <View style={{flex: 1}}>
      <Text>Backup na nuvem: </Text>
      <Switch value={true}
        thumbColor="red"
        trackColor={{false: "yellow", true: "orange"}}
      />
      {/* <Image source={imageDog} style={{flex: 1, width: 500, height: 400}} resizeMode="center"
        resizeMethod="scale"
      /> */}
      <Image source={{uri: "https://www.pngkit.com/png/full/2-20933_cute-puppies-png-background-havanese-dog.png"}}
        style={{width: "50%", height: "50%"}}
        resizeMode="contain"
      />
    </View>
  )
}