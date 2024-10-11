import { View, Text, TouchableOpacity, TextInput } from "react-native";

const Register = () => {
  return (
    <View className="flex-1 justify-center items-center ">
      <View>
        <Text className="text-2xl font-bold mb-10 text-stone-600">
          Register
        </Text>
      </View>

      <View className="w-full px-4">
        <Text className="text-4xl text-stone-600 mb-2">Welcome !</Text>

        <View className="flex flex-row justify-around items-center">
          <TextInput
            keyboardType="default"
            placeholder="First Name"
            className="border border-gray-300 mb-2 px-2 py-3"
          />

          <TextInput
            keyboardType="default"
            placeholder="Last Name"
            className="border border-gray-300 mb-2 px-2 py-3"
          />
        </View>

        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          className="border border-gray-300 mb-2 px-2 py-3"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          className="border border-gray-300 mb-2 px-2 py-3"
        />

        <TouchableOpacity className="bg-custom-red py-5 px-10 rounded-lg ">
          <Text className="text-center text-slate-100">Register</Text>
        </TouchableOpacity>

        <View className="flex flex-row mt-3 gap-x-2">
          <Text className="text-gray-400">Have an Account ?</Text>
          <Text className="text-custom-red">Login Here</Text>
        </View>
      </View>
    </View>
  );
};

export default Register;
