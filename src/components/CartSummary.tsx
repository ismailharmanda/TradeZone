import {Text, StyleSheet, View} from 'react-native';
import {theme} from 'theme';
import {toFixedNumber} from 'utils';

interface Props {
  subTotal: number;
  discounts: {
    [key: string]: {
      total: number;
      summary: number;
      discountAmount: number;
      percentage: number;
    };
  };
  summary: number;
}

export const CartSummary = ({subTotal, discounts, summary}: Props) => {
  const categories: string[] = Object.keys(discounts);
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Sub Total: {subTotal} TL</Text>
      <View>
        {!!categories.length && (
          <Text style={styles.textDiscountTitle}>Discounts:</Text>
        )}
        {categories.map(category => {
          if (discounts[category].discountAmount === 0) {
            return null;
          }
          return (
            <View key={category}>
              <Text style={styles.textCategory}>
                <Text style={styles.textCategoryTitle}>{category}</Text>{' '}
                Category{' '}
                <Text style={styles.textCategoryPercentage}>
                  {discounts[category].percentage * 100}%
                </Text>{' '}
                - {discounts[category].discountAmount} TL
              </Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.textSummary}>
        Summary:{' '}
        <Text style={styles.textSummaryPrice}>{toFixedNumber(summary, 2)}</Text>{' '}
        TL
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary.transparent,
    padding: theme.spacing.sm,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: theme.colors.tertiary.transparent,
    width: '100%',
    gap: theme.spacing.md,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
    color: theme.colors.base.dark,
    width: '100%',
    flexWrap: 'wrap',
  },
  textCategoryTitle: {
    color: theme.colors.tertiary.regular,
    textTransform: 'capitalize',
  },
  textCategory: {
    fontWeight: 'bold',
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
    color: theme.colors.base.dark,
  },
  textCategoryPercentage: {
    color: theme.colors.primary.regular,
  },
  textSummary: {
    fontWeight: 'bold',
    fontSize: theme.text.size.lg.fontSize,
    lineHeight: theme.text.size.lg.lineHeight,
    color: theme.colors.base.dark,
  },
  textSummaryPrice: {
    color: theme.colors.primary.regular,
  },
  textDiscountTitle: {
    fontWeight: 'bold',
    fontSize: theme.text.size.sm.fontSize,
    lineHeight: theme.text.size.sm.lineHeight,
    color: theme.colors.primary.regular,
    marginBottom: theme.spacing.xs,
  },
});
