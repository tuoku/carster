import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
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
  Input,
} from 'react-native-elements';
import {
  useTag,
  useUser,
  useMedia,
  useFavourites,
  useComments,
} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {FlatList} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';

const Comments = ({navigation, route}) => {
  const {update, setUpdate} = useContext(MainContext);
  console.log('getComments', route.params);
  const {getUserInfo} = useUser();
  const {getFilesByTag} = useTag();
  const {addComment, deleteComment, getCommentsByFileId, getMyComments} =
    useComments();
  const [ownerInfo, setOwnerInfo] = useState({username: ''});
  const [disabled, setDisabled] = useState(false);
  const [avatar, setAvatar] = useState('http://placekitten.com/100');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  //post owner
  const getPostOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(route.params.user_id, token));
  };
  const getCommentOwnerInfo = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setOwnerInfo(await getUserInfo(route.params.user_id, token));
  };
  const getAvatar = async (user_id) => {
    try {
      let avatarList = await getFilesByTag('avatar_' + user_id);
      if (avatarList.length > 0) {
        return uploadsUrl + avatarList.pop().filename;
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const getComments = async () => {
    console.log('row69 ', await getCommentsByFileId(route.params.file_id));
    const fetchedComments = await getCommentsByFileId(route.params.file_id);
    const comments = fetchedComments.map(async (comment, i) => {
      console.log('comment i: ', i);
      console.log('comment: ', comment.user_id);
      console.log(await getAvatar(comment.user_id));
      const newRow = 'avatarUri';
      const newVal = await getAvatar(comment.user_id);
      fetchedComments[i][newRow] = newVal;
      console.log(fetchedComments);
      setComments(fetchedComments);
    });
  };

  useEffect(() => {
    getPostOwnerInfo();
    getAvatar();
    getComments();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        {comments.map((item, i) => (
          <RNEListItem
            key={i}
            onPress={() => console.log(item.avatarUri)}
            bottomDivider
          >
            <Avatar
              size="small"
              rounded
              source={{uri: item.avatarUri}}
            ></Avatar>
            <RNEListItem.Content>
              <RNEListItem.Title numberOfLines={3} style={{fontSize: 15}}>
                {item.comment}
              </RNEListItem.Title>
            </RNEListItem.Content>
          </RNEListItem>
        ))}
        <View>
          <Input
            placeholder="Comment"
            onChangeText={(value) => {
              setComment(value);
            }}
            rightIcon={
              <Icon
                type="ionicon"
                name="paper-plane-outline"
                size={24}
                color="black"
                onPress={async () => {
                  try {
                    const token = await AsyncStorage.getItem('userToken');
                    const upload = await addComment(
                      route.params.file_id,
                      comment,
                      token
                    );
                    console.log('comment:', comment);
                    if (upload) {
                      alert('Comment added');
                    }
                  } catch (e) {
                    alert('Error: ', e.message);
                    console.log('Error', e.message);
                  }
                }}
              />
            }
          />
        </View>
      </View>
      <StatusBar style={{backgroundColor: '#fff'}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  droidSafeArea: {
    backgroundColor: '#ccc',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
});

Comments.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Comments;
