import React from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../../../hooks/useStore";
import { useRouter } from "expo-router";

const Cart = () => {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useStore(
    (state) => state.updateCartItemQuantity
  );
  const getCartTotal = useStore((state) => state.getCartTotal);

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleProceedToCheckout = () => {
    router.push("/screens/main/Checkout");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View>
          {/* Header */}
          <View className="flex flex-row items-center justify-between mb-4 mt-20 px-4 relative">
            <TouchableOpacity onPress={() => router.back()} className="z-10">
              <Ionicons
                name="chevron-back"
                size={32}
                color="#113225"
                className="mr-2"
              />
            </TouchableOpacity>
            <Text className="text-2xl text-custom-red font-extrabold absolute left-0 right-0 text-center">
              Cart
            </Text>
          </View>

          {/* Cart Items */}
          {cart.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200"
            >
              <Image
                source={item.image}
                style={{ width: 50, height: 50 }}
                className="mr-4"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-base">{item.price} Birr</Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="border py-1 px-3 rounded"
                  onPress={() =>
                    handleUpdateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                >
                  <Text className="text-lg font-bold">-</Text>
                </TouchableOpacity>
                <Text className="mx-2 text-lg">{item.quantity}</Text>
                <TouchableOpacity
                  className="border py-1 px-3 rounded"
                  onPress={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  <Text className="text-lg font-bold">+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="ml-4"
                onPress={() => handleRemoveItem(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom  */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-8">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="flex-1 text-xl font-semibold">Total:</Text>
          <Text className="text-right text-xl font-bold">
            {getCartTotal()} Birr
          </Text>
        </View>

        <TouchableOpacity
          className="bg-custom-red py-4 w-full items-center rounded-lg"
          onPress={handleProceedToCheckout}
        >
          <Text className="text-slate-100 font-semibold text-lg">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
