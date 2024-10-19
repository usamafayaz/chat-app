// src/screens/ChatScreen.jsx
import React, {useState} from 'react';
import {View, StyleSheet, Clipboard, Text} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getThemeColors, constants} from '../config/constants';
import {useSelector} from 'react-redux';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const handleSend = text => {
    if (text.trim() === '') return;

    // User A sends the message
    const newMessage = {id: Date.now(), text, user: 'userA'};
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleMessageLongPress = text => {
    Clipboard.setString(text);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <ChatHeader />
      <ChatMessages
        messages={messages}
        onMessageLongPress={handleMessageLongPress}
      />
      <ChatInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: constants.fontSizes.xlarge,
    fontFamily: constants.fontFamilies.bold,
    marginVertical: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.regular,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ChatScreen;
