import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {constants, getThemeColors} from '../config/constants';
import InputField from '../components/InputField';

const SignupScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: Implement signup logic
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, {color: colors.primary}]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, {color: colors.secondaryText}]}>
          Sign up to get started
        </Text>

        <InputField
          label="Name"
          iconName="person"
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
          placeholder="Enter your name"
        />

        <InputField
          label="Email"
          iconName="email"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <InputField
          label="Password"
          iconName="lock"
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
          placeholder="Enter your password"
          secureTextEntry
        />

        <InputField
          label="Confirm Password"
          iconName="lock"
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={handleSignUp}>
          <Text style={[styles.buttonText, {color: colors.primaryBackground}]}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.footerText, {color: colors.secondaryText}]}>
            Already have an account?{' '}
            <Text style={[styles.footerLink, {color: colors.primary}]}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
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

export default SignupScreen;
