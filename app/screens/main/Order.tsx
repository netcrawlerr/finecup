import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/hooks/useStore";
import { useRouter } from "expo-router";

const Order = () => {
  /**
   * i sectioned the UI in 5-7
   */
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = useStore((state) => state.selectedProduct);
  const clearSelectedProduct = useStore((state) => state.clearSelectedProduct);
  const addToCart = useStore((state) => state.addToCart);

  const products = useStore((state) => state.products);
  console.log("Store products ORDER");

  useEffect(() => {
    if (!selectedProduct) {
      router.back();
    }
    return () => clearSelectedProduct();
  }, [selectedProduct, router, clearSelectedProduct]);

  if (!selectedProduct) return null;

  const price = selectedProduct.price;

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    router.push("/screens/main/Cart");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View>
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
              Order
            </Text>
          </View>

          {/* for my image background area */}
          <View className="flex justify-center items-center rounded-tr-3xl bg-custom-red h-[200px]">
            <Image
              source={selectedProduct.image}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <View className="flex flex-row justify-between px-8 mt-5">
            <View className="flex flex-col">
              <Text className="text-2xl font-bold">{selectedProduct.name}</Text>
              <Text className="text-xl font-semibold">{price} Birr</Text>
            </View>

            <View className="flex flex-row justify-between gap-x-2 items-center">
              <Text className="text-xl">{quantity}</Text>
              <TouchableOpacity
                className="border py-2 px-8 rounded"
                onPress={decreaseQuantity}
              >
                <Text className="text-xl font-bold">-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border py-2 px-8 rounded"
                onPress={increaseQuantity}
              >
                <Text className="text-xl font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-row justify-between px-8 mt-5">
            <View className="flex flex-col">
              <Text className="text-xl font-semibold mb-2">Description</Text>
              <Text className="text-base">{selectedProduct.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom  */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-8">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="flex-1 text-xl font-semibold">Total:</Text>
          <Text className="text-right text-xl font-bold">
            {totalPrice} Birr
          </Text>
        </View>

        <TouchableOpacity
          className="bg-custom-red py-4 w-full items-center rounded-lg"
          onPress={handleAddToCart}
        >
          <Text className="text-slate-100 font-semibold text-lg">
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Order;
