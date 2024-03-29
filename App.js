import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { authProvider } from './src/pages/home/authContext';
import { Register } from './src/pages/home/register';
import { Login } from './src/pages/home/login';
import { Logout } from './src/pages/home/logout';

const Stack = createStackNavigator();

function App() {
  return (
    <authProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="logout" component={Logout} />
      </Stack.Navigator>
    </NavigationContainer>
    </authProvider>
  );
}

export default App;