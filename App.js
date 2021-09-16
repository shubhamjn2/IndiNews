// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "./Screens/Splash";
import Home from "./Screens/Home";
import Detail from "./Screens/Detail";
import Language from './Screens/Language';
import Settings from './Screens/Settings';
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
       <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
       <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
       <Stack.Screen name="Language" component={Language} options={{ headerShown: false }}/>
       <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;