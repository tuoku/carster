import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {Video, AVPlaybackStatus} from 'expo-av';
import LoginForm from '../components/LoginForm';
import {zhCN} from 'date-fns/locale';
import {Button} from 'react-native-elements';
import RegisterForm from '../components/RegisterForm';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [registerFormToggle, setRegisterFormToggle] = React.useState(false);
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../assets/intro.mp4')}
        useNativeControls={false}
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay={true}
      />
      {registerFormToggle ? (
        <RegisterForm style={styles.form}></RegisterForm>
      ) : (
        <LoginForm style={styles.form}></LoginForm>
      )}
      <Button
        style={styles.forgot}
        onPress={() => {
          setRegisterFormToggle(!registerFormToggle);
        }}
        title={
          registerFormToggle
            ? 'Already registered? Login here'
            : 'No account? Register here.'
        }
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width,
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  video: {
    height: height + 50,
    width: width,
    top: 0,
    left: 0,
    zIndex: -100,
    position: 'absolute',
  },
  form: {
    zIndex: 100,
    top: 200,
    flex: 3,
    alignSelf: 'stretch',
    position: 'absolute',
    marginTop: 400,
    paddingTop: 400,
    width: width - 100,
    backgroundColor: '#fff',
  },
  forgot: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

export default Login;
