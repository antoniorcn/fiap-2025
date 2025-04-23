import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Screen, Navigator} = createBottomTabNavigator();

interface CicloSocialScreenProps extends ParamListBase { 

}

const CicloSocialScreen = (props : CicloSocialScreenProps) :
     React.ReactElement => { 
    return ( 
        <View style={{flex: 1}}>
            <Text> Ciclo Social </Text>:

        </View>
    );
}

export {CicloSocialScreen}