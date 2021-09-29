import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginForm = () => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {login} = useLogin();

  const doLogin = async () => {
    try {
      const loginInfo = await login(inputs);
      console.log('doLogin response', loginInfo);
      await AsyncStorage.setItem('userToken', loginInfo.token);
      // TODO: Save user info (loginInfo.user) to MainContext
      setUser(loginInfo.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('doLogin error', error);
    }
    // navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Input
        inputContainerStyle={styles.inputView}
        inputStyle={{color: '#fff'}}
        autoCapitalize="none"
        leftIcon={<Icon name="user" size={24} color="white" />}
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        inputContainerStyle={styles.inputView}
        inputStyle={{color: '#fff'}}
        autoCapitalize="none"
        leftIcon={<Icon name="lock" size={24} color="white" />}
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />

      <Button raised title="Login!" onPress={doLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    padding: 10,
    width: '100%',
    height: 45,
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#fff',
    alignItems: 'center',
    color: '#fff',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'black',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});

export default LoginForm;
