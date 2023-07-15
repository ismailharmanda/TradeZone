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
  category: string;
  data: Product[];
  renderItem: ListRenderItem<Product>;
  ListEmptyComponent: JSX.Element;
  contentContainerStyle?: ViewStyle;
  listStyle?: ViewStyle;
}

export const ProductsList = ({
  category,
  data,
  renderItem,
  ListEmptyComponent,
  contentContainerStyle,
  listStyle,
}: Props) => {
  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const ItemSeperator = useCallback(
    () => <View style={styles.itemSeperator} />,
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{category}</Text>
      <FlatList
        ItemSeparatorComponent={ItemSeperator}
        horizontal={true}
        style={listStyle}
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
  container: {flexShrink: 1},
  text: {
    fontWeight: 'bold',
    fontSize: theme.text.size.md.fontSize,
    lineHeight: theme.text.size.md.lineHeight,
    color: theme.colors.tertiary.regular,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
  },
  itemSeperator: {
    width: theme.spacing.md,
  },
});