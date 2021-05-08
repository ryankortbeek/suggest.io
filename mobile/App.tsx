import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { Matches } from './components/Matches';


export type RootStackParamList = {
  Main: {userInfo: string};
  Login: undefined;
  Matches: {userInfo: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Login">
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Matches" component={Matches} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

