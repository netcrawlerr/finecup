import products from "../../../constants/data";

import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 120;

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const totalPrice = price * quantity;
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View>
          {/* 1 */}
          <View className="flex flex-row items-center justify-between mb-4 mt-20 px-4">
            <Ionicons
              name="chevron-back"
              size={32}
              color="#113225"
              className="mr-2"
            />
            <Text className="text-2xl text-custom-red font-extrabold absolute left-1/2 transform -translate-x-1/2">
              Order
            </Text>
          </View>

          {/* for my image background area */}
          {/* 2 */}
          <View className="flex justify-center items-center rounded-tr-3xl bg-custom-red h-[200px]">
            <Image
              source={require("../../../assets/images/espresso.png")}
              style={{ width: 100, height: 100 }}
            />
          </View>

          {/* 3 */}
          <View className="flex flex-row justify-between px-8 mt-5">
            <View className="flex flex-col">
              <Text className="text-2xl font-bold">Espresso</Text>
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

          {/* 4 */}
          <View className="flex flex-row justify-between px-8 mt-5">
            <View className="flex flex-col">
              <Text className="text-xl font-semibold mb-2">Description</Text>
              <Text className="text-base">
                The foundation of many coffee drinks, espresso is a concentrated
                shot of pure coffee flavor. Brewed by forcing hot water through
                finely-ground coffee beans under high pressure, it results in a
                strong, bold taste with a distinctive crema on top. Ingredients:
                Finely ground coffee beans and hot water. Served in a small cup
                and often enjoyed straight or used as a base for other coffee
                drinks.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom fixed section */}
      <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-8">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="flex-1 text-xl font-semibold">Total:</Text>
          <Text className="text-right text-xl font-bold">
            {totalPrice} Birr
          </Text>
        </View>

        <TouchableOpacity className="bg-custom-red py-4 w-full items-center rounded-lg">
          <Text className="text-slate-100 font-semibold text-lg">
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Order;
