import { Text, ScrollView, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import products from "../constants/data";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View className="flex flex-row items-center justify-between mb-4 mt-20 px-4">
        <Ionicons
          name="chevron-back"
          size={32}
          color="#113225"
          className="mr-2"
        />
        <Text className="text-2xl text-custom-red font-bold absolute left-1/2 transform -translate-x-1/2">
          Menu
        </Text>
      </View>
      <ScrollView>
        {products.map((product, index) => {
          return (
            <View
              key={index}
              className="flex flex-row justify-around items-center border-b-2 border-gray-300 py-2"
            >
              <View>
                <Image
                  source={product.image}
                  style={{ width: 100, height: 100 }}
                />
                <Text className="text-xl text-center">{product.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={32} color="#B98875" />
            </View>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}
