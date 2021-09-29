import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View, StyleSheet} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {Button, Input} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const {inputs, errors, handleInputChange, handleOnEndEditing, checkUsername} =
    useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    try {
      delete inputs.confirmPassword;
      const registerInfo = await register(inputs);
      if (registerInfo) {
        Alert.alert(registerInfo.message);
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputView}
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          console.log('onEndEditing value', event.nativeEvent.text);
          checkUsername(event.nativeEvent.text);
          handleOnEndEditing('username', event.nativeEvent.text);
        }}
        errorMessage={errors.username}
      />
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputView}
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('password', event.nativeEvent.text);
        }}
        errorMessage={errors.password}
      />
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputView}
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        onEndEditing={(event) => {
          handleOnEndEditing('confirmPassword', event.nativeEvent.text);
        }}
        errorMessage={errors.confirmPassword}
      />
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputView}
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('email', event.nativeEvent.text);
        }}
        errorMessage={errors.email}
      />
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputView}
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) => {
          handleOnEndEditing('full_name', event.nativeEvent.text);
        }}
        errorMessage={errors.full_name}
      />
      <Button
        title="Register!"
        onPress={doRegister}
        disabled={errors.username || errors.password || errors.email}
      />
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

export default RegisterForm;
