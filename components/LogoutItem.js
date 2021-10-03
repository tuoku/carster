import React, {useContext} from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LogoutItem = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  return (
    <DrawerItem
      label="Logout"
      onPress={async () => {
        await AsyncStorage.clear;
        setIsLoggedIn(false);
      }}
    ></DrawerItem>
  );
};

export default LogoutItem;
