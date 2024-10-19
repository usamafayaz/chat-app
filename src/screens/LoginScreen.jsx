import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {constants, getThemeColors} from '../config/constants';
import InputField from '../components/InputField';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login with:', {email, password});
    navigation.navigate('Chat');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <View style={styles.content}>
        <Text style={[styles.title, {color: colors.primary}]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          Log in to your account
        </Text>

        <InputField
          label="Email"
          iconName="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputField
          label="Password"
          iconName="lock"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={handleLogin}>
          <Text style={[styles.buttonText, {color: colors.primaryBackground}]}>
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.footerText, {color: colors.secondaryText}]}>
            Don't have an account?{' '}
            <Text style={[styles.footerLink, {color: colors.primary}]}>
              Register
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: constants.fontSizes.xlarge,
    fontFamily: constants.fontFamilies.bold,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.regular,
    marginBottom: 32,
  },
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.bold,
  },
  footerText: {
    fontSize: constants.fontSizes.small,
    fontFamily: constants.fontFamilies.regular,
    textAlign: 'center',
    marginTop: 20,
  },
  footerLink: {
    fontFamily: constants.fontFamilies.bold,
  },
});

export default LoginScreen;
