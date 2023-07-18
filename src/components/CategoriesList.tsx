import {useCallback} from 'react';
import {
  FlatList,
  ViewStyle,
  ListRenderItem,
  View,
  StyleSheet,
} from 'react-native';
import {Categories} from 'screens/Products/products';
import {theme} from 'theme';

interface Props {
  data: Categories;
  renderItem: ListRenderItem<string>;
  ListEmptyComponent: JSX.Element;
  contentContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
}

export const CategoriesList = ({
  data,
  renderItem,
  ListEmptyComponent,
  contentContainerStyle,
  listStyle,
}: Props) => {
  const keyExtractor = useCallback((item: any) => item, []);

  const ItemSeparator = useCallback(
    () => <View testID="itemSeparator" style={styles.itemSeparator} />,
    [],
  );

  return (
    <View testID="categoriesList" style={styles.container}>
      <FlatList
        testID="flatList"
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        horizontal
        style={[listStyle]}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.spacing.xl,
  },
  itemSeparator: {
    width: theme.spacing.md,
  },
});
