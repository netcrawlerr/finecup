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
import { Image } from "react-native";
import useUser from "@/hooks/useUser";

const Checkout = () => {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const clearCart = useStore((state) => state.clearCart);

  const { user } = useUser();

  const [address, setAddress] = useState({
    latitude: 9.0192,
    longitude: 38.7525,
  });
  const [name, setName] = useState(user.firstName);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 9.0192,
    longitude: 38.7525,
  });
  const [addressName, setAddressName] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // New state variable
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);

  const [transactionRef, setTransactionRef] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isBrowserOpened, setIsBrowserOpened] = useState(false);

  useEffect(() => {
    if (isPaymentFailed) {
      setModalVisible(false); // Close the modal
    }
  }, [isPaymentFailed]);

  const handlePlaceOrder = () => {
    setTransactionRef(null);
    setCheckoutUrl(null);
    setModalVisible(true);
  };

  const verifyPayment = async (transactionRef) => {
    console.log("Verifying payment for transactionRef:", transactionRef);

    try {
      const response = await axios.get(
        `${BASE_URL}/api/payments/verify/${transactionRef}`
      );
      console.log("verifying..", response.data.chapaResponse.status);

      if (response.data.chapaResponse.status === "success") {
        setModalVisible(false);
        setPaymentSuccess(true);
        setSuccessModalVisible(true);
        setIsPaymentFailed(false); // Reset the failure state
      } else {
        setPaymentSuccess(false);
        setIsPaymentFailed(true); // Set failure state to trigger rerender
        console.log("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error", error);
      setPaymentSuccess(false);
      setIsPaymentFailed(true); // Set failure state to trigger rerender
    }
  };

  const handlePayment = async () => {
    try {
      const total = getCartTotal();
      console.log("Payment data:", phoneNumber, total);

      // Reset the previous transactionRef and checkoutUrl
      setTransactionRef(null);
      setCheckoutUrl(null);

      console.log("Before api call ", transactionRef);
      console.log("Before api call ", checkoutUrl);

      const response = await axios.post(BASE_URL + "/api/payments/pay", {
        amount: total,
        phoneNumber: phoneNumber,
      });

      const responseData = response.data.data.data;

      console.log("What", responseData.checkout_url);
      console.log("ref", response.data.transactionRef);

      const newCheckoutUrl = responseData.checkout_url;
      const newTransactionRef = response.data.transactionRef;

      console.log("New Checkout URL:", newCheckoutUrl);
      console.log("New TransactionRef:", newTransactionRef);

      setTransactionRef(newTransactionRef); // Save the new transaction ref
      setCheckoutUrl(newCheckoutUrl); // Save the new checkout URL

      console.log("Checkout URL:", checkoutUrl);
      console.log("Transactionref:", transactionRef);

      // Open the payment page

      const result = await WebBrowser.openBrowserAsync(newCheckoutUrl);

      verifyPayment(newTransactionRef);
      console.log("result", result);

      // Check the result of the payment
    } catch (error) {
      console.log("Payment Error:", error);
      setPaymentSuccess(false); // Payment failed due to an error
      setIsPaymentFailed(true); // Set failure state
    }
  };

  const handleCancelPayment = () => {
    // Clear previous transaction data
    setTransactionRef(null);
    setCheckoutUrl(null);
    setModalVisible(false);
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
                <View key={item._id} className="flex-row justify-between mb-2">
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
                  className="flex justify-center items-center border border-custom-red  rounded-md p-2 w-1/2 h-11"
                  onPress={handleSearchLocation}
                >
                  <Text className="text-custom-red text-center">Search</Text>
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
            <View className="w-96 p-6 bg-white rounded-lg items-center">
              <View className="flex flex-row justify-around w-full">
                {/* Chapa Button */}
                <TouchableOpacity
                  onPress={handlePayment}
                  className="flex flex-col items-center justify-center rounded-full w-24 h-24 p-4"
                >
                  <Image
                    source={require("@/assets/images/chapa.png")}
                    className="w-28 h-28 rounded-full"
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {/* Tele Birr Button */}
                <TouchableOpacity
                  onPress={handlePayment}
                  className="flex flex-col items-center justify-center rounded-full w-24 h-24 p-4"
                >
                  <Image
                    source={require("@/assets/images/tele_birr.png")}
                    className="w-16 h-16 rounded-full"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="mt-6 border  py-4 w-full border-custom-red"
                onPress={handleCancelPayment}
              >
                <Text className="text-custom-red text-center">Cancel</Text>
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
