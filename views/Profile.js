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

const Profile = ({userr, navigation}) => {
  const {user} = useContext(MainContext);
  // if no user prop passed defaults to profile of current user
  const u = userr ? userr : user;

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
              name="menu"
              color="#000"
              onPress={() => console.log('menu')}
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
              name="edit"
              color="#000"
              onPress={() => navigation.navigate('EditProfile')}
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
              uri: 'https://s3-alpha-sig.figma.com/img/a253/2c24/a767c811e202835c4625ebc39b4c0ee9?Expires=1634515200&Signature=DV~6GuHDO8JV4dzvwvjqdVO0Ojo-qwza8CPtwisS3SqMTYnCIvvw2dcyPXx98GcunEm7uy7REwRBLbEAahhUs7KFr2Wnshcaz79qdM8sVgUbzHScGujOHD8MCFbpj7IIHCyEV-ThejVzy7U5bnmu9AmDx1TceNg2ONBCLi43Dx74eUtiB0bATgfhG9g5aj08aeCAOdImTOb9e2Sj8WbK2Mf5IDh-p-pNS7Weqs-WOOn-mmm~zwwJXjogczx-viXVTTfzdG6CG2DyePqGRCXFWlbDAIQ4newz2rBWl5j98FzD~cMcLyH31IbrXH9BwcAYt4q0pzeCSOBIoO67kI2qJg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
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
    color: '#00BFFF',
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

Profile.propTypes = {
  userr: PropTypes.object,
  navigation: PropTypes.object.isRequired,
};

export default Profile;
