import products from "../constants/data";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Welcome from "./screens/onboarding/Welcome";
import InitialLogin from "./screens/onboarding/InitialLogin";

const Entry = () => {
  // const [email, setEmail] = useState("uuser@gmail.com");
  // const [password, setPassword] = useState("1234566");
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://192.168.1.5:5000/api/auth/login",
  //         {
  //           email: email,
  //           password: password,
  //         }
  //       );
  //       const data = await response.data;
  //       console.log(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetch();
  // }, [email]);
  return (
    <View>
      {/* <Text>Hey</Text> */}
      {/* <Welcome /> */}
      <InitialLogin />
    </View>
  );
};

export default Entry;
