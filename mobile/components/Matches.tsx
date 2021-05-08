import React, { FC } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {RootStackParamList} from '../App';

type MatchesScreenRouteProp = RouteProp<RootStackParamList, 'Matches'>;

type MatchesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Matches'>;

type Props = {
    navigation: MatchesScreenNavigationProp;
    route: MatchesScreenRouteProp;
};

export const Matches: FC<Props> = ({route, navigation}) => {
    return (
        <view> THIS IS MATCHES </view>
    )
}