import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

const InputNoLabel = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCorrect,
}) => {
  const { labelStyle, inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        underlineColorAndroid="rgba(0,0,0,0)"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 5,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { InputNoLabel };
