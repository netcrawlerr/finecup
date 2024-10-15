import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { MAPTILER_API_KEY } from "@/constants/API_KEY";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useStore from "../../../hooks/useStore";
import { useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { BASE_URL } from "@/constants/URL";

const Checkout = () => {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const clearCart = useStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    latitude: 9.0192,
    longitude: 38.7525,
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 9.0192,
    longitude: 38.7525,
  });
  const [addressName, setAddressName] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePlaceOrder = () => {
    setModalVisible(true);
  };

  const handlePayment = async () => {
    try {
      const total = getCartTotal();
      console.log("Payment data:", phoneNumber, total);

      const response = await axios.post(BASE_URL + "/api/payments/pay", {
        amount: total,
        phoneNumber: phoneNumber,
      });

      // console.log(response.data.data.checkout_url);

      const checkoutUrl = response.data.data.checkout_url;
      console.log("Checkout URL:", checkoutUrl);

      // Open the payment page
      const result = await WebBrowser.openBrowserAsync(checkoutUrl);

      if (result.type === "opened") {
        // Payment success - show the success modal
        setModalVisible(false);
        setSuccessModalVisible(true);
      } else {
        // Handle cases where payment was canceled or failed
        console.log("Payment was not completed");
      }
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  const handleSuccessClose = () => {
    clearCart();
    router.push("/screens/main/Menu");
    setSuccessModalVisible(false);
  };

  const handleSearchLocation = async () => {
    const apiKey = MAPTILER_API_KEY;
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        locationInput
      )}.json?key=${apiKey}`
    );
    const data = await response.json();

    if (data.features.length > 0) {
      const { geometry } = data.features[0];
      const { coordinates } = geometry;
      const [longitude, latitude] = coordinates;

      setMarkerCoordinate({ latitude, longitude });
      reverseGeocode(latitude, longitude);
    } else {
      console.log("Location not found");
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = MAPTILER_API_KEY;
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${apiKey}`
    );
    const data = await response.json();

    if (data.features.length > 0) {
      const address = data.features[0].place_name;
      setAddressName(address);
    } else {
      console.log("Address not found");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
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

            {/* summary */}
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

            {/* uSer indfo */}
            <View className="px-4 ">
              <Text className="text-xl font-bold mb-2">
                Customer Information
              </Text>
              <View className="flex flex-row w-full gap-x-2">
                <TextInput
                  className="border border-gray-300 rounded-md p-2 mb-2 w-1/2"
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  className="border border-gray-300 rounded-md p-2 mb-2 w-1/2"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              {/* search h */}
              <View className="flex flex-row w-full  gap-x-2">
                <TextInput
                  className="border border-gray-300 rounded-md p-2 mb-2 w-1/2"
                  placeholder="Search Location"
                  value={locationInput}
                  onChangeText={setLocationInput}
                />
                <TouchableOpacity
                  className="flex justify-center items-center bg-custom-red rounded-md p-2 w-1/2 h-12"
                  onPress={handleSearchLocation}
                >
                  <Text className="text-slate-100 text-center">Search</Text>
                </TouchableOpacity>
              </View>

              {/* addressTO hold the location area  */}
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                placeholder="Address"
                value={addressName}
                editable={false}
              />
            </View>
          </View>

          <MapView
            style={{ width: "100%", height: 300 }}
            region={{
              latitude: markerCoordinate.latitude,
              longitude: markerCoordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setMarkerCoordinate({ latitude, longitude });
              reverseGeocode(latitude, longitude);
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            }}
          >
            <Marker
              coordinate={markerCoordinate}
              title="Current Location"
              description="You are here"
            />
          </MapView>
        </ScrollView>

        {/* Bottom  */}
        <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-8 bg-slate-200">
          <TouchableOpacity
            className="bg-custom-red py-4 w-full items-center rounded-lg"
            onPress={handlePlaceOrder}
          >
            <Text className="text-slate-100 font-semibold text-lg">
              Pay and Order
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text className="text-lg font-bold mb-4">Payment</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Expiration Date (MM/YY)"
                value={expirationDate}
                onChangeText={setExpirationDate}
              />
              <TextInput
                className="border border-gray-300 rounded-md p-2 mb-2"
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
              />
              <TouchableOpacity
                className="bg-custom-red py-2 rounded-md"
                onPress={handlePayment}
              >
                <Text className="text-slate-100 text-center">
                  Confirm Payment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mt-4"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-blue-500 text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={successModalVisible}
          onRequestClose={handleSuccessClose}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: 300,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
              }}
            >
              <Text className="text-lg font-bold mb-4">Payment Successful</Text>
              <Text className="mb-4">Your order has been placed!</Text>
              <TouchableOpacity
                className="bg-custom-red py-2 rounded-md"
                onPress={handleSuccessClose}
              >
                <Text className="text-slate-100 text-center">OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Checkout;
