import React from 'react';
import {StyleSheet, ScrollView, ViewStyle} from 'react-native';

import {theme} from 'theme';

interface Props {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ScrollableContentContainer = ({
  children,
  containerStyle,
  contentContainerStyle,
}: Props) => (
  <ScrollView
    contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
    style={[styles.container, containerStyle]}>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: theme.spacing.screenHorizontalPadding,
    backgroundColor: theme.colors.base.white,
    gap: theme.spacing.md,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: theme.spacing.screenVerticalPadding,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
