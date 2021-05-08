import React, { FC } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {RootStackParamList} from '../App';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
};


export const Login: FC<Props> = ({route, navigation}) => {
    return (
        <view> THIS IS LOGIN </view>
    )
}