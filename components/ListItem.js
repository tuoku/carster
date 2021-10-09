import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
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
import {Video, Audio} from 'expo-av';
import {useTag, useUser, useMedia, useFavourites} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {View} from 'react-native';

const ListItem = ({singleMedia, navigation, showButtons}) => {
  const {update, setUpdate} = useContext(MainContext);
  console.log('singleMedia', singleMedia);
  const {deleteMedia} = useMedia();
  const {getUserInfo} = useUser();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [likes, setLikes] = useState([]);
  const [iAmLikingIt, setIAmLikingIt] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('http://placekitten.com/100');

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(singleMedia.user_id, token));
  };
  const getLikes = async () => {
    // TODO: use api hooks to get favourites
    // setLikes()
    // set the value of iAmLikingIt
  };
  const getAvatar = async () => {
    try {
      const avatarList = await getFilesByTag('avatar_' + singleMedia.user_id);
      if (avatarList.length > 0) {
        setAvatar(uploadsUrl + avatarList.pop().filename);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOwnerInfo();
    getAvatar();
    getLikes();
  }, []);

  return (
    <RNEListItem style={{width: '100%'}}>
      <View style={{width: '100%'}}>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Avatar size="small" rounded source={{uri: avatar}}></Avatar>
          <Text style={{marginLeft: 10}}>{ownerInfo.username}</Text>
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
          {singleMedia.media_type === 'video' && (
            <TouchableOpacity // usePoster hides video so use this to start it
              disabled={disabled}
              onPress={() => {
                setDisabled(true); // disable touchableOpacity when video is started
              }}
            >
              <Video
                style={{width: '100%', height: undefined, aspectRatio: 1}}
                source={{uri: uploadsUrl + singleMedia.filename}}
                useNativeControls
                resizeMode="contain"
                usePoster
                posterSource={{uri: uploadsUrl + singleMedia.screenshot}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {iAmLikingIt ? (
            <Icon
              //ios-heart for filled heart
              type="ionicon"
              name="ios-heart"
              color="#000"
              onPress={() => console.log('menu')}
              size={40}
            />
          ) : (
            <Icon
              type="ionicon"
              name="ios-heart-outline"
              color="#000"
              onPress={() => console.log('menu')}
              size={40}
            />
          )}

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
