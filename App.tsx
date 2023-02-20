import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './components/ListScreen/ListScreen';
import PhotoScreen from './components/PhotoScreen/PhotoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;