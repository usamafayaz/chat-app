import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {constants, getThemeColors} from '../config/constants';

const InputField = ({
  label,
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  isUsername = false,
  onUsernameValidation,
  error,
}) => {
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleInputChange = useCallback(
    text => {
      onChangeText(text);

      if (isUsername && onUsernameValidation) {
        setIsChecking(true);
        const timeoutId = setTimeout(() => {
          onUsernameValidation(text).finally(() => setIsChecking(false));
        }, 500);

        return () => clearTimeout(timeoutId);
      }
    },
    [isUsername, onUsernameValidation, onChangeText],
  );

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, {color: colors.secondaryText}]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: colors.inputBackground},
          error && styles.inputWrapperError,
        ]}>
        <Icon
          name={iconName}
          size={24}
          color={colors.iconInactive}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.input, {color: colors.primaryText}]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderText}
          value={value}
          onChangeText={handleInputChange}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={isUsername ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePassword}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color={colors.iconInactive}
            />
          </TouchableOpacity>
        )}
        {isUsername && (
          <View style={styles.statusIcon}>
            {isChecking ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : value && !error ? (
              <Icon name="check" size={24} color="green" />
            ) : value ? (
              <Icon name="cancel" size={24} color="red" />
            ) : null}
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: constants.fontSizes.small,
    fontFamily: constants.fontFamilies.regular,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: 'red',
    borderWidth: 0.8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.regular,
  },
  statusIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: constants.fontSizes.small,
    marginTop: 4,
  },
});

export default InputField;
