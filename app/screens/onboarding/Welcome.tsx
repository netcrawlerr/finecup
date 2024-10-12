import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ImageBackground, Text, View } from "react-native";

const Welcome = () => {
  return (
    <View className="flex flex-col justify-between items-center h-screen py-10">
      <View />
      <View className="flex items-center">
        <ImageBackground
          source={require("@/assets/images/coffee-cup.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <Text className="mt-5 text-2xl text-center">FineCup</Text>
      </View>

      <Link
        href={{
          pathname: "/screens/onboarding/InitialLogin",
        }}
      >
        <Ionicons name="chevron-forward" size={46} />
      </Link>
    </View>
  );
};

export default Welcome;
