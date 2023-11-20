import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const StartCamera = ({ navigation }) => {
  const [status, requestPermission] = Camera.useCameraPermissions();

  const startCamera = async () => {
    await requestPermission();

    if (status.granted) {
      return navigation.replace("scan");
    } else {
      Alert.alert("permission not granted");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startCamera}>
        <Text>Snap Business Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
