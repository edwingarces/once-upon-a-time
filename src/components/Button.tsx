import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false,
  style,
}) => {
  const buttonStyles = [
    styles.button,
    disabled ? styles.disabled : null,
    style || {},
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4D869C',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  disabled: {
    backgroundColor: '#CDE8E5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
