import {View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');

  useEffect(() => {
    (async () => {
      const file = await getFilesByTag('avatar_' + user.user_id);
      console.log('file', file);
      // setAvatar(uploadsUrl + file.pop().filename);
    })();
  }, [user]);

  /* const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  }; */ // TODO logout token
  return <View></View>;
};

export default Profile;
