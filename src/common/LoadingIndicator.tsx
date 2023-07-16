import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {theme} from 'theme';

type Props = {
  isLoading: boolean;
  text?: string;
};

export const LoadingIndicator = ({isLoading, text = 'Loading...'}: Props) => {
  return (
    <View
      testID="loading-indicator"
      style={[styles.container, !isLoading && styles.hide]}>
      <ActivityIndicator
        size={'large'}
        style={styles.activityIndicator}
        color={theme.colors.base.white}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0, 0,0, 0.1)',
    zIndex: 2,
  },
  activityIndicator: {
    transform: [{scaleX: 2}, {scaleY: 2}],
    top: '25%',
  },
  hide: {
    display: 'none',
  },
  text: {
    textAlign: 'center',
    color: theme.colors.base.white,
    fontSize: theme.text.size.lg.fontSize,
    lineHeight: theme.text.size.lg.lineHeight,
    fontWeight: 'bold',
    top: '30%',
    marginHorizontal: 30,
  },
});
