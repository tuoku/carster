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
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutItem from '../components/LogoutItem';
import Notifications from '../views/Notifications';
import Messages from '../views/Messages';
import Settings from '../views/Settings';
import Profile from '../views/Profile';
import Comments from '../views/Comments';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditProfile from '../views/EditProfile';
import Search from '../views/Search';
import GuestProfile from '../views/GuestProfile';
import Chat from '../views/Chat';
import Upload from '../views/Upload';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      ></Stack.Screen>


      <Stack.Screen name="Comments" component={Comments} />

      <Stack.Screen name="Upload" component={Upload} />

      <Stack.Screen
        name="GuestProfile"
        component={GuestProfile}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

    </Stack.Navigator>
  );
};

const DrawerScreen = () => {
  const {user} = useContext(MainContext);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      backBehavior="firstRoute"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <LogoutItem></LogoutItem>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name={user.username}
        component={Profile}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="user" size={size} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Icon name="home" size={size} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="flag" size={size} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="comment" size={size} color="black" />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon name="cog" size={size} color="black" />
          ),
        }}
      ></Drawer.Screen>
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
