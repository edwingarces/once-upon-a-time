import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Text } from '.';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  capitalize?: boolean;
  emailKeyboard?: boolean;
  numericKeyboard?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  capitalize,
  emailKeyboard,
  numericKeyboard,
  helperText,
  style = {},
  ...rest
}) => {
  const inputStyle = [styles.input, capitalize && styles.capitalize];

  const keyboardType = emailKeyboard
    ? 'email-address'
    : numericKeyboard
    ? 'numeric'
    : 'default';

  return (
    <View style={[styles.container, style || {}]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={inputStyle}
        keyboardType={keyboardType}
        autoCapitalize={emailKeyboard ? 'none' : 'sentences'}
        {...rest}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  helperText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
});

export default Input;
