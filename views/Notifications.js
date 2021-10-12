import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import {useFonts, FugazOne_400Regular} from '@expo-google-fonts/fugaz-one';

const Notifications = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    FugazOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <Header
          containerStyle={{
            backgroundColor: '#fff',
            padding: 0,
            margin: 0,
          }}
          leftComponent={
            <Icon
              type="ionicon"
              name="arrow-back"
              color="#000"
              onPress={() => console.log('menu')}
            />
          }
          leftContainerStyle={{
            top: 5,
          }}
          centerComponent={{
            text: 'Carster',
            style: {
              color: '#000',
              fontFamily: 'FugazOne_400Regular',
              fontSize: 36,
              lineHeight: 43,
            },
          }}
        />
        <View style={styles.container}></View>
        <StatusBar style={{backgroundColor: '#fff'}} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});

Notifications.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Notifications;
