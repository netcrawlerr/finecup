import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import useStore from "@/hooks/useStore"; 
import { router } from "expo-router";
import axios from "axios";
import { BASE_URL } from "@/constants/URL";
import AccountDropdown from "@/app/components/AccountDropdown";

const Menu = () => {
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

 
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(BASE_URL + "/api/products");
        setProducts(response.data); 
        // console.log("Store products MENU", products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);
  // console.log(products[0].image);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4">
        {/* <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#113225" />
        </TouchableOpacity> */}
        <Text className="text-2xl text-custom-red font-bold">Menu</Text>
        {/* <View>
          <Text>Account</Text>
        </View> */}
        <AccountDropdown />
        {/* <View style={{ width: 28 }} /> */}
      </View>

      <View className="px-4 pt-4">
        <TextInput
          className="bg-gray-100 rounded-lg p-2 mb-4"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryPress(category)}
              className={`mr-2 p-2 rounded-lg ${
                selectedCategory === category ? "bg-custom-red" : "bg-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedCategory === category ? "text-white" : "text-gray-800"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <TouchableOpacity
              key={product._id}
              className="flex-row items-center bg-gray-100 rounded-lg mb-4 overflow-hidden"
              onPress={() => {
                setSelectedProduct(product._id);
                router.push("/screens/main/Order");
              }}
            >
              <Image
                source={{ uri: product.image }}
                className="w-24 h-24 rounded-l-lg"
                resizeMode="cover"
              />
              <View className="flex-1 p-3">
                <Text className="text-lg font-semibold text-gray-800">
                  {product.name}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {product.shortDescription}
                </Text>
                <Text className="text-custom-red font-bold mt-2">
                  {product.price.toFixed(2)} Birr
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#B98875"
                className="mr-2"
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-center text-gray-500 mt-4">
            No products found. Try adjusting your search or category.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Menu;
