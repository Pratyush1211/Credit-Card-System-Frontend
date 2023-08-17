import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import colors from "../constants/colors";

// screens
import UsecaseOne from "../screens/UsecaseOne";
import UseCaseTwo from "../screens/UseCaseTwo";
import UsecaseThree from "../screens/UsecaseThree";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MerchantDetailsScreen from "../screens/MerchantDetailsScreen";
import CitiesDetailsScreen from "../screens/CitiesDetailsScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
    card: colors.white,
    primary: colors.red,
    text: colors.green,
    border: "transparent",
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Navigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{
            title: "Credit Card Management",
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
            name="Merchant"
            component={MerchantDetailsScreen}
            options={{
                title: "Spending Analysis By Merchant",
                }}
        />
        <Stack.Screen
            name="City"
            component={CitiesDetailsScreen}
            options={{
                title: "Spending Analysis By City",
                }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Case one"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Case One") {
            iconName = focused ? "numeric-1-circle" : "numeric-1-circle-outline";
          } else if (route.name === "Case Two") {
            iconName = focused ? "numeric-2-circle" : "numeric-2-circle-outline";
          } else if (route.name === "Case Three"){
            iconName = focused ? "numeric-3-circle" : "numeric-3-circle-outline";
          }
          return (
            <MaterialCommunityIcons
              name={iconName}
              size={focused ? 25 : 25}
              color={focused ? colors.green : colors.black}
            />
          );
        },
        tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            borderTopColor: colors.lightgray,
            borderTopWidth: 0.5,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false
      })}
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Case One" component={UsecaseOne} />
      <Tab.Screen name="Case Two" component={UseCaseTwo} />
      <Tab.Screen name="Case Three" component={UsecaseThree} />
    </Tab.Navigator>
  );
}
