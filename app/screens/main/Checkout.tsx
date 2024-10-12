import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../../../hooks/useStore";
import { useRouter } from "expo-router";

const Checkout = () => {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const clearCart = useStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePlaceOrder = () => {
    // later, iwill send the order to your backend

    clearCart();
    router.push("/screens/main/Menu");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View>
            {/* Header */}
            <View className="flex flex-row items-center justify-between mb-4 mt-20 px-4 relative">
              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute left-4 z-10"
              >
                <Ionicons name="chevron-back" size={32} color="#113225" />
              </TouchableOpacity>
              <Text className="text-2xl text-custom-red font-extrabold flex-1 text-center">
                Checkout
              </Text>
            </View>

            {/* Order Summary */}
            <View className="px-4 py-4 bg-gray-100 mb-4">
              <Text className="text-xl font-bold mb-2">Order Summary</Text>
              {cart.map((item) => (
                <View key={item.id} className="flex-row justify-between mb-2">
                  <Text>
                    {item.name} x{item.quantity}
                  </Text>
                  <Text>{item.price * item.quantity} Birr</Text>
                </View>
              ))}
              <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-300">
                <Text className="font-bold">Total:</Text>
                <Text className="font-bold">{getCartTotal()} Birr</Text>
              </View>
            </View>

            {/* Customer Information */}
            <View className="px-4">
              <Text className="text-xl font-bold mb-2">
                Customer Information
              </Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom  */}
        <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-8 bg-slate-200">
          <TouchableOpacity
            className="bg-custom-red py-4 w-full items-center rounded-lg"
            onPress={handlePlaceOrder}
          >
            <Text className="text-slate-100 font-semibold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Checkout;
