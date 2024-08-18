import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/Pwdaan-Logo.png")}
        style={styles.logoImage}
      />
      <View style={styles.bottomBox}>
        <Text style={styles.desc}>PWDaan</Text>
        <Text style={styles.desc2}>
          A PWD Accessibility Crowdsourcing Native Mobile Application
        </Text>

        <Text style={styles.desc2}>Email</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoImage: {
    width: 350,
    height: 350,
    marginBottom: 300,
  },
  bottomBox: {
    position: "absolute",
    bottom: 0,
    left: -22,
    right: -22,
    height: 380,
    backgroundColor: "#185c6b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  desc: {
    fontSize: 45,
    fontFamily: "outfit-bold",
    bottom: 100,
    color: "#fff",
  },
  desc2: {
    fontSize: 12,
    fontFamily: "outfit-bold",
    bottom: 100,
    color: "#fff",
  },
});
