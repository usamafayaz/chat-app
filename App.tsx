import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from './src/redux/store';
import {getThemeColors} from './src/config/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';

// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Create a new component that will be wrapped by the Provider
const ThemedApp = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <StatusBar
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.secondaryBackground}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          {/* Login and Signup Pages */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />

          {/* Chat screen, available after login/signup */}
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
