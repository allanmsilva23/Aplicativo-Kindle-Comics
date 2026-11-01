import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Tela1 from './src/Tela1';
import Tela2 from './src/Tela2';
import Tela3 from './src/Tela3';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Tela1"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141724',
          borderTopColor: '#262B40',
          borderTopWidth: 1,
          paddingTop: 6,
          paddingBottom: insets.bottom + 10,
          height: insets.bottom + 65,
        },
        tabBarActiveTintColor: '#F5C518',
        tabBarInactiveTintColor: '#8A94A6',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen
        name="Tela1"
        component={Tela1}
        options={{
          tabBarLabel: 'PÁGINA INICIAL',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tela2"
        component={Tela2}
        options={{
          tabBarLabel: 'BIBLIOTECA',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tela3"
        component={Tela3}
        options={{
          tabBarLabel: 'LEITOR HQ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#0F111A" />
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}