import "react-native-gesture-handler";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import Helps from "./components/screens/Helps";
import Notification from "./components/screens/Notification";
import Home from "./components/screens/Home";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import LoginScreen from "./components/screens/LoginScreen";
import LaunchScreen from "./components/screens/LaunchScreen";
import SignupScreen from "./components/screens/SignupScreen";
import SignUpVerificationScreen from "./components/screens/SignUpVerificationScreen";
import AccountScreen from "./components/Tabs/ProfileDetail/AccountScreen";
import ProfileScreen from "./components/Tabs/ProfileScreen";
import { GlobalProvider } from "./components/contextAPI/GlobalState";

import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
const home = "Home";
const helps = "Helps";
const notification = "Notification Screen";

const Drawer = createDrawerNavigator();
//20521495_LeDinhTuanKiet
export default function App() {
  const [test, setTest] = useState(null);
  console.log(test);
  // let initialUser = null;
  // initialUser = (initialUser as User | null);

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user, "user");
      setUser(user);
      console.log(user, "console user");
    });
  }, []);
  // if (user) {
  //   navigation.navigate("Home");
  // }
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Welcome">
          {/* <Drawer.Screen
            name="Welcome"
            component={WelcomeScreen}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Launch"
            component={LaunchScreen}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Signup"
            component={SignupScreen}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="SignUpVerification"
            component={SignUpVerificationScreen}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            // options={{ headerShown: false }}
          />
          <Drawer.Screen
            name={home}
            component={Home}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
              // headerShown: false,
            }}
          />
          <Drawer.Screen
            name={notification}
            component={Notification}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="notifications-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name={helps}
            component={Helps}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="help-circle-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          /> */}
          {user ? (
            <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
          ) : (
            <>
              <Drawer.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="Launch"
                component={LaunchScreen}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="SignUpVerification"
                component={SignUpVerificationScreen}
                options={{ headerShown: false }}
              />
              <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
  //20521495_LeDinhTuanKiet
}
