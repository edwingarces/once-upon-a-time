import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  getChildren,
  getUser,
  // removeChilds, If you need to restart the onboarding process, uncomment those lines
  // removeUser,
} from '../utils';
import { PersonalInfo, ChildrenInfo, Home } from '../screens';
import { useAuth } from '../contexts';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, logout, login } = useAuth();

  useEffect(() => {
    const userSaved = getUser();
    const childrenSaved = getChildren();
    if (userSaved && childrenSaved) {
      login();
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // removeChilds();
  // removeUser();
  // logout();
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'PersonalInfo'}>
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChildrenInfo"
        component={ChildrenInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
