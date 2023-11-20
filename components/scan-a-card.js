import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";

const ScanACard = () => {
  const [type, setType] = useState(CameraType.back);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  const cameraRef = useRef(null);
  const animation = useRef(new Animated.Value(0)).current;

  const flipCamera = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(
      setType((current) =>
        current === CameraType.back ? CameraType.front : CameraType.back
      )
    );
  };

  const rotateCameraStyle = {
    transform: [
      {
        rotateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const captureImage = async () => {
    const options = { quality: 1, base64: true };

    try {
      if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync(options);

        setSelectedImage(uri);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  const handleStartRecapture = () => {
    setSelectedImage(null);
  };

  return (
    <View>
      {selectedImage ? (
        <View>
          <Image
            source={{ uri: selectedImage }}
            resizeMode="contain"
            style={{ height: 500, width: "100%" }}
          />
        </View>
      ) : (
        <>
          <Camera
            type={type}
            style={styles.camera}
            ref={cameraRef}
            onCameraReady={() => {
              setCameraReady(true);
            }}
          >
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                ...rotateCameraStyle,
              }}
            ></Animated.View>
          </Camera>
        </>
      )}
      <>
        <View>
          {selectedImage ? (
            <TouchableOpacity
              onPress={handleStartRecapture}
              style={styles.button}
            >
              <Text style={styles.button_text}>Re-Capture</Text>
            </TouchableOpacity>
          ) : (
            <>
              {cameraReady && (
                <TouchableOpacity onPress={captureImage} style={styles.button}>
                  <Text style={styles.button_text}>Capture</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <TouchableOpacity style={styles.toggle} onPress={flipCamera}>
          <Text style={styles.toggle_icon}>Flip Camera</Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default ScanACard;

const styles = StyleSheet.create({
  camera: {
    height: 500,
    width: "100%",
  },
  toggle: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flex: 0.1,
  },
  toggle_icon: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  button_text: {
    color: "white",
    fontSize: 18,
  },
});
