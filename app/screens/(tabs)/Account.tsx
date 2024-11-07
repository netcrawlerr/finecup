import React from "react";
import { View, Text, Button } from "react-native";

const Account = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Account
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: csdfvvdsd</Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Email: xsass@example.com
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Phone: (123) 456-7890
        </Text>
      </View>
      <Button
        title="Edit Profile"
        onPress={() => console.log("Edit Profile pressed")}
      />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Change Password"
          onPress={() => console.log("Change Password pressed")}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Logout"
          onPress={() => console.log("Logout pressed")}
          color="red"
        />
      </View>
    </View>
  );
};

export default Account;
