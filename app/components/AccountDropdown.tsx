import { BASE_URL } from "@/constants/URL";
import axios from "axios";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import useUser from "@/hooks/useUser";
import { router } from "expo-router";

const AccountDropdown = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { setUser } = useUser();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async () => {
    // Implement your logout functionality
    console.log("Logging out...");
    try {
      const response = await axios.get(BASE_URL + "/api/auth/logout");
      const data = await response.data;
      console.log("user logged out ----");
      setUser(null);
      router.replace("/screens/main/Login");
    } catch (error) {
      console.log(error);
    }
    setDropdownVisible(false);
  };

  const handleSettings = () => {
    // Navigate to settings page
    console.log("Navigating to settings...");
    setDropdownVisible(false);
  };

  return (
    <View>
      {/* Account Button */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.accountButton}>
        <Text style={styles.accountText}>Account</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDropdown}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={toggleDropdown}
        >
          <View style={styles.dropdownContainer}>
            {/* Settings Option */}
            <TouchableOpacity
              onPress={handleSettings}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>Settings</Text>
            </TouchableOpacity>

            {/* Logout Option */}
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.dropdownItem}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = {
  accountButton: {
    padding: 8, // Equivalent to `p-2` in Tailwind
    backgroundColor: "#E5E7EB", // Equivalent to `bg-gray-300`
    borderRadius: 8, // Equivalent to `rounded`
  },
  accountText: {
    fontSize: 18, // Equivalent to `text-lg`
    fontWeight: "bold", // Equivalent to `font-bold`
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Equivalent to backdrop opacity
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF", // Equivalent to `bg-white`
    borderRadius: 8, // Equivalent to `rounded-lg`
    padding: 16, // Equivalent to `p-4`
    width: 192, // Equivalent to `w-48`
  },
  dropdownItem: {
    paddingVertical: 8, // Equivalent to `py-2`
    borderBottomWidth: 1, // Equivalent to `border-b`
    borderColor: "#E5E7EB", // Equivalent to `border-gray-200`
  },
  dropdownText: {
    fontSize: 16, // Equivalent to `text-base`
  },
  logoutText: {
    fontSize: 16, // Equivalent to `text-base`
    color: "#EF4444", // Equivalent to `text-red-500`
  },
};

export default AccountDropdown;
