import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Header, Icon} from 'react-native-elements';
import AppLoading from 'expo-app-loading';
import {useFonts, FugazOne_400Regular} from '@expo-google-fonts/fugaz-one';
import EditProfile from './EditProfile';
import {useTag, useUser, useMedia, useFavourites} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import {uploadsUrl} from '../utils/variables';

const GuestProfile = (props) => {
  const {user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/100');
  const {getFilesByTag} = useTag();
  // if no user prop passed defaults to profile of current user
  const u = props.route.params.userr ? props.route.params.userr : user;
  const getAvatar = async () => {
    try {
      const avatarList = await getFilesByTag('avatar_' + u.user_id);
      if (avatarList.length > 0) {
        setAvatar(uploadsUrl + avatarList.pop().filename);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAvatar();
  });
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
              onPress={() => props.navigation.pop()}
            />
          }
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
          // 'type' prop to change icon set
          rightComponent={
            <Icon
              type="material"
              name="chat"
              color="#000"
              onPress={() => props.navigation.navigate('Chat')}
            />
          }
        />
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2016%2F01%2F73496-car-BMW.jpg&f=1&nofb=1',
            }}
            style={styles.header}
          ></Image>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar,
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{u.username}</Text>
              <Text style={styles.description}>
                Hello, my name is Hankster but my friends call me Hank
              </Text>
            </View>
          </View>
        </View>
        <StatusBar style={{backgroundColor: '#fff'}} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});

GuestProfile.propTypes = {
  userr: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default GuestProfile;
