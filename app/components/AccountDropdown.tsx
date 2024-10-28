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
    
    console.log("Navigating to settings...");
    setDropdownVisible(false);
  };

  return (
    <View>

      <TouchableOpacity onPress={toggleDropdown} style={styles.accountButton}>
        <Text style={styles.accountText}>Account</Text>
      </TouchableOpacity>


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
           
            <TouchableOpacity
              onPress={handleSettings}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownText}>Settings</Text>
            </TouchableOpacity>

       
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
    padding: 8, 
    backgroundColor: "#E5E7EB",
    borderRadius: 8, 
  },
  accountText: {
    fontSize: 18, 
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF", 
    borderRadius: 8, 
    padding: 16, 
    width: 192, 
  },
  dropdownItem: {
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderColor: "#E5E7EB", 
  },
  dropdownText: {
    fontSize: 16, 
  },
  logoutText: {
    fontSize: 16, 
    color: "#EF4444", 
  },
};

export default AccountDropdown;
