import { BASE_URL } from "@/constants/URL";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const welcomeTextColor = "#57534e";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setLoginError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(BASE_URL + "/api/auth/login", {
        email: email,
        password: password,
      });
      const data = await response.data;
      console.log(data);
      setLoginError("");

  
      router.push("/screens/main/Menu");
    } catch (error) {
      if (error) {
        error.response.data.errors.forEach((error) => {
          console.log("error is ", error.msg);
          setLoginError(error.msg);
        });
      } else {
        setLoginError("An unexpected error occurred.");
      }
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-1 justify-center items-center px-4">
        <View>
          <Text className="text-2xl font-bold mb-10 text-stone-600">Login</Text>
        </View>

        <View className="w-full px-4">
          <Text className="text-4xl text-stone-600 mb-2">Welcome Back!</Text>
          {/* error holder */}
          {loginError && (
            <Text className="text-sm text-red-600 mb-2">{loginError}</Text>
          )}
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            cursorColor={welcomeTextColor}
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 mb-2 px-2 py-3"
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            cursorColor={welcomeTextColor}
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 mb-2 px-2 py-3"
          />

          <Text className="text-custom-red text-right mb-8 mt-2">
            Forgot Password ?
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            // href={{ pathname: "/screens/main/Menu" }}
            className="bg-custom-red py-4 px-10 rounded-lg  text-slate-100"
          >
            <Text className="text-slate-100 text-center">Login</Text>
          </TouchableOpacity>

          <View className="flex flex-row mt-3 gap-x-2">
            <Text className="text-gray-400">Don't have Account ?</Text>
            <Link
              href={{ pathname: "/screens/main/Register" }}
              className="text-custom-red"
            >
              Register Here
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
