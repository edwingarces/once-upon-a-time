import {
  NavigationAction,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import React, { RefObject } from 'react';

export type RootStackParamList = {
  Onboarding: undefined;
  PersonalInfo: undefined;
  ChildrenInfo: undefined;
  Home: undefined;
};

export const navigationRef = React.createRef() as RefObject<
  NavigationContainerRef<RootStackParamList>
>;

export function navigate(name: keyof RootStackParamList, params = {}) {
  // @ts-ignore
  navigationRef?.current?.navigate(name, params);
}

export function dispatch(
  action: NavigationAction | ((state: NavigationState) => NavigationAction),
) {
  navigationRef?.current?.dispatch(action);
}
