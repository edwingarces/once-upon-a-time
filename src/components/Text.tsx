import React, { PropsWithChildren } from 'react';
import { Text as RNText, TextStyle } from 'react-native';

type TextVariant = 'title' | 'subtitle' | 'paragraph' | 'caption';

interface TextProps extends PropsWithChildren {
  variant?: TextVariant;
  style?: TextStyle;
}

const Text: React.FC<TextProps> = ({
  variant = 'paragraph',
  style,
  children,
}) => {
  let textStyle: TextStyle = {};

  switch (variant) {
    case 'title':
      textStyle = { fontSize: 24, fontWeight: 'bold' };
      break;
    case 'subtitle':
      textStyle = { fontSize: 18, fontWeight: 'bold' };
      break;
    case 'paragraph':
      textStyle = { fontSize: 16 };
      break;
    case 'caption':
      textStyle = { fontSize: 12, fontStyle: 'italic' };
      break;
    default:
      break;
  }

  return <RNText style={[textStyle, style]}>{children}</RNText>;
};

export default Text;
