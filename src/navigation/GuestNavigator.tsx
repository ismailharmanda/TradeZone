import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from 'screens/Login';
import {SCREENS} from 'config/screens';

const Stack = createNativeStackNavigator();

export const GuestNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
