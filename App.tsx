import {StyleSheet, Easing, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import List from './src/Screens/List';
import Details from './src/Screens/Details';

import TravelList from './src/Screens/TravelList';
import TravelListDetails from './src/Screens/TravelListDetails';

import TravelUpList from './src/Screens/TravelUpList';
import TravelUpDetails from './src/Screens/TravelUpDetails';

enableScreens();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="List"
            component={List}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerShown: false,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
                close: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
              },
              gestureEnabled: false,
              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {opacity: progress},
                };
              },
            }}
          />
        </Stack.Navigator> */}
        <Stack.Navigator>
          <Stack.Screen
            name="TravelUpList"
            component={TravelUpList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TravelUpDetails"
            component={TravelUpDetails}
            options={{
              headerShown: false,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
                close: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
              },
              gestureEnabled: false,
              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {opacity: progress},
                };
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
