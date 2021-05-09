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
import { TouchableHighlight } from 'react-native-gesture-handler';

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
      setPassword("");
      setEmail("");
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
        <TouchableHighlight
          style={styles.button}
          onPress={() => setIsLoggingIn(true)}
          disabled={vPassword != password || password == ''}
        >
          <Text style={styles.button_text}>Login</Text>
        </TouchableHighlight>
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
        <TextField
          label='name'
          secureTextEntry={false}
          value={name}
          onChange={onChangeName}
        />
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
        <TextField
          label='confirm password'
          value={vPassword}
          onChange={onChangeVPassword}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={() => setIsSigningUp(true)}
          disabled={vPassword != password || password == ''}
        >
          <Text style={styles.button_text}>Sign Up</Text>
        </TouchableHighlight>
      </>
    );
  };
  return (
    <View style={styles.basic_container}>
      <Text style={styles.main_title}>suggest.io</Text>
      {isCreate ? signup() : login()}
      <Text> {error} </Text>
    </View>
  );
};

const styles = {
  ...baseStyles,
  ...StyleSheet.create({
    text_input: {
      width: undefined,
      height: undefined,
      marginTop: 5,
      marginLeft: 10,
    },
    text_input_container: {
      borderRadius: 15,
      backgroundColor: '#FFFFFF',
      width: '70%',
      height: 60,
      marginBottom: 50,
    },
    text_input_label: {
      marginLeft: 10,
      marginTop: 5,
    },
    main_title: {
      fontSize: 40,
      fontFamily: 'System',
      fontWeight: 'bold',
      paddingBottom: 60,
      color: '#FFFFFF',
    },
    button: {
      borderRadius: 15,
      backgroundColor: '#FFFFFF',
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    button_text: {
      fontSize: 22,
      fontFamily: 'System',
      fontWeight: 'bold',
      color: '#000000',
    },
  }),
};
