import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScanACard, StartCamera } from "./components";

const Stack = createStackNavigator();

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{ gestureEnabled: false, headerBackTitleVisible: true }}
      >
        <Stack.Screen
          name="home"
          component={StartCamera}
          options={{
            title: "",
          }}
        />

        <Stack.Screen
          name="scan"
          component={ScanACard}
          options={{
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
