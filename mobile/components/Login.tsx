import React, { useContext, FC } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../util/firebaseSetup';
import { postSignUp } from '../hooks/api/user';
import { baseStyles } from './style';

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (s: string) => void;
  secureTextEntry: boolean;
};
const TextField: FC<TextFieldProps> = (props) => {
  return (
    <View style={styles.text_input_container}>
      <Text style={styles.text_input_label}>{props.label}</Text>
      <TextInput
        style={styles.text_input}
        value={props.value}
        onChangeText={props.onChange}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
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
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          result.user?.updateProfile({ displayName: name });
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
        <TextField
          label='email'
          value={email}
          onChange={onChangeEmail}
          secureTextEntry={false}
        />
        <TextField
          label='password'
          value={password}
          onChange={onChangePassword}
          secureTextEntry={true}
        />
        <Button title={'Login'} onPress={() => setIsLoggingIn(true)} />
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
        <TextInput
          secureTextEntry={false}
          value={name}
          onChangeText={onChangeName}
          style={styles.text_input}
        />
        <TextInput
          secureTextEntry={false}
          value={email}
          onChangeText={onChangeEmail}
          style={styles.text_input}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={onChangePassword}
          style={styles.text_input}
        />
        <TextInput
          secureTextEntry={true}
          value={vPassword}
          onChangeText={onChangeVPassword}
          style={styles.text_input}
        />
        <Button
          title='Sign Up'
          onPress={() => setIsSigningUp(true)}
          disabled={vPassword != password || password == ''}
        />
      </>
    );
  };
  return (
    <View style={styles.container}>
      {isCreate ? signup() : login()}
      <Text> {error} </Text>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text_input: {
      width: undefined,
      height: undefined,
      marginTop: 5,
      marginLeft: 10,
    },
    text_input_container: {
      borderRadius: 15,
      borderWidth: 1,
      width: '70%',
      height: 60,
      marginBottom: 50,
    },
    text_input_label: {
      marginLeft: 10,
      marginTop: 5,
    },
  }),
};
