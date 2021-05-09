import React, { useContext, FC } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { TextInput, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../util/firebaseSetup';
import { postSignUp } from '../hooks/api/user';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vPassword, setVPassword] = useState('');
  const [name, setName] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isLogInFail, setIsLogInFail] = useState(false);
  const [isSignUpFail, setIsSignUpFail] = useState(false);
  const [error, setError] = useState('');

  const user = useContext(AuthContext);

  const onChangeEmail = (email: string) => {
    setEmail(email);
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

  useEffect(() => {
    if (isLoggingIn) {
      signIn();
    } else if (isLogInSuccess) {
      setIsLogInSuccess(false);
      navigation.navigate('Main');
    } else if (isLogInFail) {
      setIsLogInFail(false);
    } else if (isSigningUp) {
      creatAccount();
    } else if (isSignUpSuccess) {
      setIsSignUpSuccess(false);
      navigation.navigate('Main');
    } else if (isSignUpFail) {
      setIsSignUpFail(false);
    }
  }, [
    isLoggingIn,
    isLogInSuccess,
    isLogInFail,
    isSigningUp,
    isSignUpSuccess,
    isSignUpFail,
  ]);

  const changeSignUp = () => {
    setEmail('');
    setPassword('');
    setIsCreate(true);
  };

  // https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a
  const creatAccount = async () => {
    try {
      // 
      await auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
          result.user?.updateProfile({displayName: name});
          postSignUp(user?.uid);
      });

      setIsSigningUp(false);
      setIsSignUpSuccess(true);

    } catch (error) {
      setError(error.message);
      setIsSigningUp(false);
      setIsSignUpFail(true);
    }
  };

  // https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a
  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsLoggingIn(false);
      setIsLogInSuccess(true);

    } catch (error) {
      setError(error.message);
      setIsLoggingIn(false);
      setIsLogInFail(true);
    }
  };

  const login = () => {
    return (
      <>
        <TextInput label='email' value={email} onChangeText={onChangeEmail} />
        <TextInput
          secureTextEntry={true}
          label='password'
          value={password}
          onChangeText={onChangePassword}
        />
        <Button onPress={() => setIsLoggingIn(true)} mode='outlined'>
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
        <TextInput secureTextEntry={false} label='Name' value={name} onChangeText={onChangeName} />
        <TextInput secureTextEntry={false} label='email' value={email} onChangeText={onChangeEmail} />
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
          onPress={() => setIsSigningUp(true)}
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
      <Text> {error} </Text>
    </View>
  );
};
