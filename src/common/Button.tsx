import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {theme} from 'theme';

interface Props {
  type?: 'primary' | 'primary-outline';
  style?: any;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  text: string;
}

export const Button = ({
  type = 'primary',
  disabled,
  style,
  onPress,
  loading,
  text,
  ...props
}: Props) => {
  const buttonDisabled = disabled || loading;
  return (
    <TouchableOpacity
      disabled={buttonDisabled}
      style={[
        styles.button,
        styles[type],
        buttonDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      {...props}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.base.white} />
      ) : (
        <Text style={[styles.text]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: theme.height.button,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius,
  },
  primary: {
    backgroundColor: theme.colors.primary.regular,
  },
  'primary-outline': {
    backgroundColor: theme.colors.base.white,
    borderWidth: 1,
    borderColor: theme.colors.primary.regular,
  },
  disabled: {
    backgroundColor: theme.colors.primary.transparent,
  },
  text: {
    fontWeight: 'bold',
    fontSize: theme.text.size.md.fontSize,
    lineHeight: theme.text.size.md.lineHeight,
    color: theme.colors.secondary.regular,
  },
});
