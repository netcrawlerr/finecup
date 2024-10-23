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

import Menu from "./screens/main/Menu";
import Login from "./screens/main/Login";
import Cart from "./screens/main/Cart";
import useUser from "@/hooks/useUser";
import { BASE_URL } from "@/constants/URL";

const Entry = () => {
  const { isLoggedIn, user } = useUser();
  console.log("user in the <>", user);

  return isLoggedIn ? <Menu /> : <Login />;
};

export default Entry;
