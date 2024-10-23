// SignupScreen.js
import React, {useState, useCallback, useMemo} from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {constants, getThemeColors} from '../config/constants';
import InputField from '../components/InputField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}) => {
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Memoize Firebase queries
  const usersRef = useMemo(() => firestore().collection('users'), []);

  // Memoize availability check functions
  const checkAvailability = useCallback(
    async (field, value) => {
      try {
        const snapshot = await usersRef.where(field, '==', value.trim()).get();
        return snapshot.empty;
      } catch (error) {
        console.error(`Error checking ${field} availability:`, error);
        return false;
      }
    },
    [usersRef],
  );

  const validateUsername = useCallback(
    async username => {
      if (!username) return;
      const isAvailable = await checkAvailability('username', username);
      setErrors(prev => ({
        ...prev,
        username: isAvailable ? '' : 'Username is already taken',
      }));
      return isAvailable;
    },
    [checkAvailability],
  );

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [field]: '',
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSignUp = async () => {
    if (!validateForm() || isLoading) return;

    setIsLoading(true);
    try {
      // Check email and username availability in parallel
      const [isEmailAvailable, isUsernameAvailable] = await Promise.all([
        checkAvailability('email', formData.email),
        checkAvailability('username', formData.username),
      ]);

      if (!isEmailAvailable) {
        setErrors(prev => ({...prev, email: 'Email is already registered'}));
        return;
      }

      if (!isUsernameAvailable) {
        setErrors(prev => ({...prev, username: 'Username is already taken'}));
        return;
      }

      const result = await auth().createUserWithEmailAndPassword(
        formData.email,
        formData.password,
      );

      await usersRef.doc(result.user.uid).set({
        name: formData.name.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      ToastAndroid.show('Account created successfully!', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Signup error:', error);
      ToastAndroid.show('Failed to create account', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={[styles.title, {color: colors.primary}]}
          allowFontScaling={false}>
          Create Account
        </Text>
        <Text
          style={[styles.subtitle, {color: colors.secondaryText}]}
          allowFontScaling={false}>
          Sign up to get started
        </Text>

        <InputField
          label="Name"
          iconName="person"
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
          placeholder="Enter your name"
          error={errors.name}
        />

        <InputField
          label="Username"
          iconName="badge"
          value={formData.username}
          onChangeText={text => handleInputChange('username', text)}
          placeholder="Enter your username"
          isUsername
          onUsernameValidation={validateUsername}
          error={errors.username}
        />

        <InputField
          label="Email"
          iconName="email"
          value={formData.email}
          onChangeText={text => handleInputChange('email', text)}
          placeholder="Enter your email"
          keyboardType="email-address"
          error={errors.email}
        />

        <InputField
          label="Password"
          iconName="lock"
          value={formData.password}
          onChangeText={text => handleInputChange('password', text)}
          placeholder="Enter your password"
          secureTextEntry
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          iconName="lock"
          value={formData.confirmPassword}
          onChangeText={text => handleInputChange('confirmPassword', text)}
          placeholder="Confirm your password"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: colors.primary},
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSignUp}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={colors.primaryBackground} />
          ) : (
            <Text
              style={[styles.buttonText, {color: colors.primaryBackground}]}
              allowFontScaling={false}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={[styles.footerText, {color: colors.secondaryText}]}
            allowFontScaling={false}>
            Already have an account?{' '}
            <Text
              style={[styles.footerLink, {color: colors.primary}]}
              allowFontScaling={false}>
              Sign in
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
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default SignupScreen;
