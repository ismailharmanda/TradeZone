const config = {
  screens: {
    ProductsStack: {
      screens: {
        ProductsScreen: {
          path: 'product/:productId/:title',
        },
      },
    },
    CartStack: {
      screens: {
        CartScreen: {
          path: 'cart',
        },
      },
    },
  },
};

const linking = {
  prefixes: ['tradezone://'],
  config,
};
export {linking};
