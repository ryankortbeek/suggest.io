import React, { FC } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {RootStackParamList} from '../App';

type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
    navigation: MainScreenNavigationProp;
    route: MainScreenRouteProp;
};

export const Main: FC<Props> = ({route, navigation}) => {
    return (
        <View> THIS IS MAIN </View>
    )
}
