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
  const {getMyFavourites, addFavourite, deleteFavourite, getFavouritesByFileId} = useFavourites();
  const [avatar, setAvatar] = useState('http://placekitten.com/100');

  const getOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(singleMedia.user_id, token));
    console.log('token in listitem', token);
  };
  const getLikes = async () => {
    try {
      const likesByFileId = await getFavouritesByFileId(singleMedia.file_id);
      setLikes(likesByFileId);

      const myLikes = await getMyFavourites(await AsyncStorage.getItem('userToken'));
      console.log('myLikes', myLikes);
      const currentLikes = myLikes.filter((like) => {
        if (like.file_id === singleMedia.file_id) {
          return like;
        }
      });
      console.log('currentLikes', currentLikes);
      setIAmLikingIt(currentLikes.length > 0 ? true : false);
    } catch (e) {
      console.log('Error', e.message);
    }
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
  const likeMedia = async () => {
    console.log("likemedia", singleMedia.file_id)
    addFavourite(singleMedia.file_id, await AsyncStorage.getItem('userToken'));
  };
  const dislikeMedia = async () => {
    deleteFavourite(singleMedia.file_id, await AsyncStorage.getItem('userToken'));
  };
  const updateLikesUI = async (id) => {
    if(id === 0) {
      likes.length += 1;
    } else {
      likes.length -= 1;
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
          <Text>Likes: {likes.length}</Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
          {iAmLikingIt ? (
            <Icon
              //ios-heart for filled heart
              type="ionicon"
              name="ios-heart"
              color="#b8142a"
              onPress={async () => dislikeMedia().then(setIAmLikingIt(false)).then(updateLikesUI(1))}
              size={40}
            />
          ) : (
            <Icon
              type="ionicon"
              name="ios-heart-outline"
              color="#000"
              onPress={async () => likeMedia().then(setIAmLikingIt(true)).then(updateLikesUI(0))}
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
