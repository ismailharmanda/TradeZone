import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput as Input,
  ViewStyle,
} from 'react-native';
import {theme} from 'theme';
import {TextInputProps} from 'react-native';

interface Props {
  containerStyle?: ViewStyle;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  errorText?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  textContentType?: TextInputProps['textContentType'];
  error?: boolean;
}

export const TextInput = ({
  containerStyle,
  value,
  disabled,
  onChangeText,
  errorText,
  textContentType,
  placeholder,
  ...props
}: Props) => (
  <View style={[styles.container, containerStyle]}>
    <Input
      autoCapitalize="none"
      keyboardType={
        textContentType === 'emailAddress' ? 'email-address' : 'default'
      }
      secureTextEntry={textContentType === 'password'}
      textContentType={textContentType}
      pointerEvents={disabled ? 'none' : 'auto'}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder={placeholder}
      {...props}
    />
    {!!errorText && <Text style={styles.error}>{errorText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: theme.colors.secondary.regular,
    color: theme.colors.base.dark,
    height: theme.height.input,
    borderRadius: theme.radius,
    paddingHorizontal: theme.spacing.sm,
    fontWeight: 'bold',
  },
  error: {
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
    color: theme.colors.error.regular,
    paddingHorizontal: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
});
