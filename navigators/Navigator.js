/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';
import Home from '../views/Home';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutItem from '../components/LogoutItem';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerContent = () => {
  const logout = () => {
    const {setIsLoggedIn} = useContext(MainContext);
    // await AsyncStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <DrawerContentScrollView>
      <LogoutItem></LogoutItem>
    </DrawerContentScrollView>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Drawer"
            component={DrawerScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

const DrawerScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={drawerContent}>
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
