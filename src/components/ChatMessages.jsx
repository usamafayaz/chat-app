// src/components/ChatMessages.jsx
import React, {useRef, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {constants, getThemeColors} from '../config/constants';

const ChatMessages = ({messages, onMessageLongPress}) => {
  const flatListRef = useRef(null);
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const renderItem = ({item: message}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={() => onMessageLongPress(message.text)}
        delayLongPress={500}>
        <View
          style={[
            styles.messageBubble,
            message.user
              ? [
                  styles.userMessage,
                  {backgroundColor: colors.messageBubbleUser},
                ]
              : [styles.aiMessage, {backgroundColor: colors.messageBubbleAI}],
          ]}>
          <Text
            allowFontScaling={false}
            style={[{color: colors.primaryText}, styles.messageText]}>
            {message.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      windowSize={20}
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({animated: true})
      }
      onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
    />
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: constants.fontSizes.medium,
  },
});

export default React.memo(ChatMessages);
