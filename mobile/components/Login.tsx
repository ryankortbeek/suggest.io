import React, { ChangeEvent, FC } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export const Login: FC<Props> = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vPassword, setVPassword] = useState('');
  const [name, setName] = useState('');
  const [isCreate, setIsCreate] = useState(false);

  const onChangeUsername = (username: string) => {
    setUsername(username);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
  };

  const onChangeName = (name: string) => {
    setName(name);
  };

  const onChangeVPassword = (password: string) => {
    setVPassword(password);
  };
  const changeSignUp = () => {
    setUsername('');
    setPassword('');
    setIsCreate(true);
  };

  const login = () => {
    return (
      <>
        <TextInput
          label='username'
          value={username}
          onChangeText={onChangeUsername}
        />
        <TextInput
          secureTextEntry={true}
          label='password'
          value={password}
          onChangeText={onChangePassword}
        />
        <Button
          onPress={() => navigation.navigate('Main', { userInfo: 'Jane' })}
          mode='outlined'
        >
          LOGIN
        </Button>
        <Text>
          Don't have an account?{' '}
          <Text
            onPress={() => changeSignUp()}
            style={{ color: '#000', fontWeight: 'bold' }}
          >
            Sign up
          </Text>
        </Text>
      </>
    );
  };

  const signup = () => {
    return (
      <>
        <TextInput label='Name' value={name} onChangeText={onChangeName} />
        <TextInput
          label='username'
          value={username}
          onChangeText={onChangeUsername}
        />
        <TextInput
          secureTextEntry={true}
          label='password'
          value={password}
          onChangeText={onChangePassword}
        />
        <TextInput
          secureTextEntry={true}
          label='confirm password'
          value={vPassword}
          onChangeText={onChangeVPassword}
          error={vPassword != password}
        />
        <Button
          onPress={() => navigation.navigate('Main', { userInfo: 'Jane' })}
          mode='outlined'
          disabled={vPassword != password || password == ''}
        >
          SIGN UP
        </Button>
      </>
    );
  };
  return (
    <View>
      <Text> Suggest.io </Text>
      {isCreate ? signup() : login()}
    </View>
  );
};
