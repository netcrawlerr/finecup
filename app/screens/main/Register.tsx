import axios from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import { BASE_URL } from "@/constants/URL.js";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";

const Register = () => {
  const welcomeTextColor = "#57534e";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !phone) {
      setRegisterError("All fields are required.");
      return;
    }

    console.log("********************");
    console.log("firstName", firstName);
    console.log("LastName", lastName);
    console.log("email", email);
    console.log("password", password);
    console.log("phone", phone);
    console.log("********************");
    console.log(BASE_URL);

    try {
      const response = await axios.post(BASE_URL + "/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      const data = await response.data;
      router.replace("/screens/main/Login");
      setRegisterError("");
      console.log("response::: ", data);
    } catch (error) {
      if (error) {
        error.response.data.errors.forEach((error) => {
          console.log("error is ", error.msg);
          setRegisterError(error.msg);
        });
      } else {
        setRegisterError("An unexpected error occurred.");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-2xl font-bold mb-10 text-stone-600">
          Register
        </Text>

        <View className="w-full px-4">
          <Text className="text-4xl text-stone-600 mb-1">Welcome !</Text>

          {/* error holder */}
          {registerError && (
            <Text className="text-sm text-red-600 mb-2">{registerError}</Text>
          )}

          <View className="flex flex-row justify-between items-center gap-x-2">
            <TextInput
              keyboardType="default"
              placeholder="First Name"
              autoCapitalize="none"
              cursorColor={welcomeTextColor}
              value={firstName}
              onChangeText={setFirstName}
              className="border flex-1 w-1/2 border-gray-300 mb-2 px-2 py-3"
            />

            <TextInput
              keyboardType="default"
              placeholder="Last Name"
              autoCapitalize="none"
              cursorColor={welcomeTextColor}
              value={lastName}
              onChangeText={setLastName}
              className="border flex-1 w-1/2 border-gray-300 mb-2 px-2 py-3"
            />
          </View>

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

          <TextInput
            secureTextEntry={false}
            placeholder="Phone"
            keyboardType="number-pad"
            autoCapitalize="none"
            cursorColor={welcomeTextColor}
            value={phone}
            onChangeText={setPhone}
            className="border border-gray-300 mb-2 px-2 py-3"
          />

          <TouchableOpacity
            onPress={handleRegister}
            className="bg-custom-red py-4 px-10 rounded-lg flex items-center justify-center  text-center"
          >
            <Text className="text-slate-100">Register</Text>
          </TouchableOpacity>

          <View className="flex flex-row mt-3 gap-x-2">
            <Text className="text-gray-400">Have an Account ?</Text>
            <Link
              href={{ pathname: "/screens/main/Login" }}
              className="text-custom-red"
            >
              Login Here
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
