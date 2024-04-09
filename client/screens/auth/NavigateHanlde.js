// NavigationHandler.js
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const NavigationHandler = ({ isLoggedIn }) => {
  const navigation = useNavigation();
  const notificationListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        const pushNotificationData = notification.request.content.data;
      console.log(pushNotificationData);

      if (pushNotificationData && isLoggedIn) {
        // User is logged in, navigate to the desired screen
        navigation.replace(pushNotificationData.targetScreen, { data: pushNotificationData });
      }
      else if (pushNotificationData && !isLoggedIn) {
        // User is not logged in, navigate to the login screen
        navigation.replace('Login');
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, [isLoggedIn, navigation]);

  return null;
};

export default NavigationHandler;
