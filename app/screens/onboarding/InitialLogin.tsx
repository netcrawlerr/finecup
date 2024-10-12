import { Link } from "expo-router";
import {
  View,
  SafeAreaView,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";

const InitialLogin = () => {
  return (
    <View className="flex text-center flex-col justify-center items-center h-screen">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={require("@/assets/images/coffee-shop.png")}
        className="w-64 h-64"
        resizeMode="contain"
      />

      <View>
        <Text className="mt-5 text-2xl text-stone-600 text-center">
          Get The Finest Coffee
        </Text>
        <Text className="mt-5 text-2xl text-stone-600 text-center">
          In Addis !
        </Text>
      </View>

      <View className="flex flex-row justify-center items-center mt-5 text-center ">
        <Link
          href={{
            pathname: "/screens/main/Login",
          }}
          className="bg-custom-red py-5 px-10 rounded-lg text-center text-slate-100 mx-5 flex-1"
        >
          Login
        </Link>

        <Link
          href={{
            pathname: "/screens/main/Register",
          }}
          className="bg-slate-100 border border-custom-red text-center text-custom-red py-5 px-10 rounded-lg mx-5 flex-1"
        >
          Register
        </Link>
      </View>
    </View>
  );
};

export default InitialLogin;
