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
const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
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
      <LoginForm style={styles.form}></LoginForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    alignSelf: 'stretch',
    position: 'absolute',
    marginTop: 400,
    paddingTop: 400,
    height: 400,
    width: width - 100,
    backgroundColor: '#fff',
  },
});

export default Login;
