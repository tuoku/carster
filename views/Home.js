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

const Home = ({navigation}) => {
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
          leftComponent={{
            icon: 'menu',
            color: '#000',
            iconStyle: {color: '#000'},
          }}
          leftContainerStyle={{
            top: 5,
          }}
          rightContainerStyle={{
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
          rightComponent={
            <View style={styles.headerRight}>
              <Icon
                type="feather"
                name="upload"
                color="#000"
                onPress={() => console.log('pressed')}
              />
              <Icon
                name="search"
                color="#000"
                style={{marginLeft: 15}}
                onPress={() => navigation.navigate('Search')}
              />
            </View>
          }
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
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
