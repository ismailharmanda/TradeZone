import {Text, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {theme} from 'theme';

interface Props {
  onPress: (item: string) => void;
  activeCategory: string;
  item: string;
}

export const CategoryBadge = ({onPress, activeCategory, item}: Props) => {
  const isBadgeActive = activeCategory === item;
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <View
        style={[
          styles.container,
          isBadgeActive && {
            backgroundColor: theme.colors.tertiary.regular,
          },
        ]}>
        <Text
          style={[styles.text, activeCategory === item && styles.textActive]}>
          {item}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', borderRadius: theme.radius},
  text: {
    padding: theme.spacing.sm,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    color: theme.colors.base.dark,
  },
  textActive: {
    color: theme.colors.base.white,
    textDecorationLine: 'none',
  },
});
