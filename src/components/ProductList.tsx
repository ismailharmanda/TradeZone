import {useCallback} from 'react';
import {
  FlatList,
  ViewStyle,
  Text,
  ListRenderItem,
  View,
  StyleSheet,
} from 'react-native';
import {Product} from 'screens/Products/products';
import {theme} from 'theme';

interface Props {
  category?: string;
  data: Product[];
  renderItem: ListRenderItem<Product>;
  ListEmptyComponent: JSX.Element;
  contentContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  activeCategory?: string;
  containerStyle?: ViewStyle;
  vertical?: boolean;
}

export const ProductsList = ({
  category,
  data,
  renderItem,
  ListEmptyComponent,
  contentContainerStyle,
  listStyle,
  activeCategory,
  containerStyle,
  vertical = false,
}: Props) => {
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const isCategoryActive = activeCategory === category;

  const ItemSeparator = useCallback(
    () => <View testID="itemSeparator" style={styles.itemSeparator} />,
    [],
  );

  return (
    <View
      testID="productsList"
      style={[
        styles.container,
        !!activeCategory && activeCategory !== category && styles.hide,
        containerStyle,
      ]}>
      <Text style={styles.text}>{category}</Text>
      <FlatList
        testID="flatList"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        horizontal={!isCategoryActive && !vertical}
        style={listStyle}
        contentContainerStyle={[
          contentContainerStyle,
          (isCategoryActive || vertical) &&
            styles.activeCategoryContentContainer,
        ]}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexShrink: 1},
  activeCategoryContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: theme.text.size.md.fontSize,
    lineHeight: theme.text.size.md.lineHeight,
    color: theme.colors.primary.regular,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
  },
  itemSeparator: {
    width: theme.spacing.md,
  },
  hide: {
    display: 'none',
  },
});
