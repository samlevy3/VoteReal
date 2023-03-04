import { useRouter, useSegments } from "expo-router";
import { Platform } from 'react-native';
import React, { useState, useRef, SetStateAction, useDeferredValue } from "react";
import IUser from "../../models/IUser";
import IVote from "../../models/IVote";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


async function registerForPushNotificationsAsync(): Promise<SetStateAction<string>> {
  let token: SetStateAction<string> = {} as SetStateAction<string>;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return "";
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


export interface IAuth {
    loggedIn: boolean;
    user: IUser; 
    logIn: (login: { username: string, password: string }) => void;
    signUp: (user: IUser) => void;
    logOut: () => void;
    vote: (user: IUser, vote: boolean) => void;
}

const AuthContext = React.createContext<IAuth>({} as IAuth);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(auth: any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !auth.loggedIn && segments[0] != "(auth)"
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (auth.loggedIn && segments[0] == "(auth)") {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [auth, segments]);
}

export function Provider(props: any) {
    const [auth, setAuth] = React.useState({
        loggedIn: false,
        user: {} as IUser
    });
    const router = useRouter();
    const [expoPushToken, setExpoPushToken] = useState('');
    const notificationListener: any = useRef();
    const responseListener: any = useRef();
    
    useProtectedRoute(auth);

    React.useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => { 
        setAuth(prevState => {
          let newUser: IUser = prevState.user;  
          newUser.currVote = notification.request.content.data as IVote; 
          return {
            ...prevState,
            user: newUser
          }
        })  
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        setAuth(prevState => {
          let newUser: IUser = prevState.user;  
          newUser.currVote = response.notification.request.content.data as IVote; 
          return {
            ...prevState,
            user: newUser
          }
        }) 
        router.replace('/(tabs)/vote');        
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    const logIn = (login: { username: string, password: string }) => {
        let newUser: IUser = {
          username: login.username,
          password: login.password,
          votes: [],
          currVote: null,
          uuid: "1"
        }
        setAuth(prevState => ({
            ...prevState,
            loggedIn: true,
            user: newUser
        }));
    };  

    const signUp = (login: { username: string, password: string }) => {
      let newUser: IUser = {
        username: login.username,
        password: login.password,
        councilMembers: [],
        votes: [],
        currVote: null
      }
      setAuth(prevState => ({
          ...prevState,
          user: newUser
      }));
    };  

    const logOut = () => {
        setAuth(prevState => ({
            ...prevState,
            loggedIn: false,
            user: {} as IUser
        }));
    };

    const vote = (user: IUser, vote: boolean) => {
      let newUser: IUser = user; 
      if (newUser.currVote) {
        newUser.currVote.vote = vote;
        newUser.votes.push(newUser.currVote); 
      }
      newUser.currVote = null;
      setAuth(prevState => ({
          ...prevState,
          user: newUser
      }));
      router.replace("/");
    };

    return (
        <AuthContext.Provider
        value={{
            ...auth,
            logIn,
            logOut,
            signUp,
            vote
        }}
        >
        {props.children}
        </AuthContext.Provider>
    );
}