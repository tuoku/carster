// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';
// eslint-disable-next-line no-unused-vars
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class Profile extends Component {
  render() {
    return (
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
            <Text style={styles.name}>Hankster</Text>
            <Text style={styles.description}>
              Hello, my name is Hankster but my friends call me Hank
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

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
  /* name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
   */
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
