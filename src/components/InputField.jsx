import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  keyboardType,
}) => {
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, {color: colors.secondaryText}]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {backgroundColor: colors.inputBackground},
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
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType || 'default'}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color={colors.iconInactive}
            />
          </TouchableOpacity>
        )}
      </View>
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.regular,
  },
});

export default InputField;
