import { View, ImageBackground, Text, TouchableOpacity } from "react-native";

const InitialLogin = () => {
  return (
    <View className="flex text-center flex-col justify-center items-center h-screen">
      <ImageBackground
        source={require("../../../assets/images/coffee-shop.png")}
        className="w-64 h-64"
        resizeMode="contain"
      ></ImageBackground>

      <View>
        <Text className="mt-5 text-2xl text-stone-600 text-center">
          Get The Finest Coffee
        </Text>
        <Text className="mt-5 text-2xl text-stone-600 text-center">
          In Addis !
        </Text>
      </View>

      <View className="flex flex-row justify-center items-center mt-5 text-center ">
        <TouchableOpacity className="bg-custom-red py-5 px-10 rounded-lg mx-5 flex-1">
          <Text className="text-center text-slate-100">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-100 border border-custom-red py-5 px-10 rounded-lg mx-5 flex-1">
          <Text className="text-center text-custom-red">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InitialLogin;
