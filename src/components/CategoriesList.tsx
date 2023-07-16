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

  const ItemSeperator = useCallback(
    () => <View style={styles.itemSeperator} />,
    [],
  );

  return (
    <View testID="categoriesList" style={styles.container}>
      <FlatList
        testID="flatList"
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeperator}
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
  itemSeperator: {
    width: theme.spacing.md,
  },
});
