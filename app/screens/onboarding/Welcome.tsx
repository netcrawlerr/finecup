import { ImageBackground, Text, View } from "react-native";

const Welcome = () => {
  return (
    <View className="flex text-center flex-col justify-center items-center h-screen">
      <ImageBackground
        source={require("../../../assets/images/coffee-cup.png")}
        className="w-32 h-32"
        resizeMode="contain"
      ></ImageBackground>
      <Text className="mt-5 text-2xl text-center">FinCup</Text>
    </View>
  );
};

export default Welcome;
