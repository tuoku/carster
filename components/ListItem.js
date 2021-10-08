import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  Text,
  Icon,
  Image,
  Card,
  ListItem as RNEListItem,
} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {View} from 'react-native';

const ListItem = ({singleMedia, navigation, showButtons}) => {
  const {update, setUpdate} = useContext(MainContext);
  console.log('singleMedia', singleMedia);
  const {deleteMedia} = useMedia();

  return (
    <RNEListItem
      onPress={() => {
        //navigation.navigate('Single', singleMedia);
        console.log('pressed' + singleMedia.media_type);
      }}
      style={{width: '100%'}}
    >
      <View style={{width: '100%'}}>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Avatar
            size="small"
            rounded
            source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
          ></Avatar>
          <Text style={{marginLeft: 10}}>juku</Text>
          <Icon
            type="ionicon"
            name="ios-ellipsis-vertical-outline"
            color="#000"
            onPress={() => console.log('menu')}
            containerStyle={{
              alignSelf: 'flex-end',
              left: 245,
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          {singleMedia.media_type === 'image' && (
            <Card.Image
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                borderRadius: 10,
              }}
              source={{uri: uploadsUrl + singleMedia.filename}}
            />
          )}
        </View>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Icon
            //ios-heart for filled heart
            type="ionicon"
            name="ios-heart-outline"
            color="#000"
            onPress={() => console.log('menu')}
            size={40}
          />
          <Icon
            type="ionicon"
            name="ios-chatbubble-ellipses-outline"
            color="#000"
            onPress={() => console.log('menu')}
            size={38}
            containerStyle={{marginLeft: 15}}
          />
        </View>
      </View>
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
