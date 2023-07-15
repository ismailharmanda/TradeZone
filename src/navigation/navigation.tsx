import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {linking} from 'config/linking';
import {UserNavigator} from './UserNavigator';
import {GuestNavigator} from './GuestNavigator';
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from 'navigation';
import {GlobalState} from 'store/reducers';
import {LoginState} from 'screens/Login/login.action';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const Navigation = () => {
  const {isUserAuthenticaed} = useSelector<GlobalState, LoginState>(
    state => state.LOGIN,
  );
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {isUserAuthenticaed ? <UserNavigator /> : <GuestNavigator />}
    </NavigationContainer>
  );
};
