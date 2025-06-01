import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Register = () => {
  const router = useRouter();
  const testInputs = /^[^<>&/=]*$/;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideShow, setHideShow] = useState(true);
  const [warnMessage, setWarnMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passHideShow = () => setHideShow(!hideShow);

  const securityTest = (text) => testInputs.test(text);

  const signUp = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential)
      {
        console.warn("Success creating!")
        return true
      }
      // const userRef = doc(db, "users", userCredential.user.uid);

      // await setDoc(userRef, {
      //   name,
      //   email,
      //   createdAt: new Date().toISOString(),
      // });

      // await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));

    } catch (error) {
      console.error("Signup error:", error);
      setWarnMessage(error.message);
      Alert.alert("Registration Error", error.message);
      return false;
    }
  };

  const handleCredentials = async () => {
    if (!name || !email || !password) {
      setWarnMessage("Please fill in all fields.");
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (!securityTest(email) || !securityTest(password)) {
      setWarnMessage("Invalid characters used.");
      Alert.alert("Validation Error", "Invalid characters used.");
      return;
    }
    setLoading(true)
    const success = await signUp(email, password, name);
    if (success) {
      console.warn("Success login!")
      router.push("(tabs)/home");
      setLoading(false)
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginscreen}>
        <Text style={styles.welcomeBack}>Register</Text>


        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.select({ ios: 8, android: 500 })}
        >
          <View style={styles.inputForm}>
            <TextInput
              style={[styles.inputFormChild1, styles.inputShadowBox]}
              placeholder="Name"
              placeholderTextColor="#92a0a9"
              value={name}
              onChangeText={setName}
            />

            {/* Email Input */}
            <TextInput
              style={[styles.inputFormChild, styles.inputShadowBox]}
              placeholder="Email"
              placeholderTextColor="#92a0a9"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.inputFormItem, styles.inputShadowBox]}
                placeholder="Password"
                placeholderTextColor="#92a0a9"
                secureTextEntry={hideShow}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={passHideShow}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={hideShow ? "eye-off" : "eye"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signInWrapper}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttons} onPress={handleCredentials}>
                <Text style={styles.buttonTitle}>Create Account</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.signInWrapper}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttons} onPress={handleCredentials} disabled={loading}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.buttonTitle}>  Create Account</Text>
                </View>
              ) : (
                <Text style={styles.buttonTitle}>Create Account</Text>
              )}
            </Pressable>
          </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
  },
  welcomeBack: {
    fontSize: 45,
    height: 70,
    marginTop: 16,
    width: 350,
    textAlign: "center",
    color: "#000",
    fontFamily: "Gudea-Bold",
    fontWeight: "800",
  },
  inputShadowBox: {
    fontSize: 15,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    height: 50,
    width: 350,
    fontFamily: "Gudea-Bold",
    fontWeight: "700",
    paddingLeft: 19,
    paddingRight: 45,
  },
  inputFormItem: {
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 14,
    marginStart: -8,
  },
  inputContainer: {
    position: "relative",
    margin: 8,
    width: "100%",
  },
  inputFormChild: {
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 14,
  },
  inputFormChild1: {
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 14,
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
    margin: 8,
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 13,
  },
  loginscreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    justifyContent: "center",
  },
  signUpContainer: {
    marginTop: 60,
    flexDirection: "row",
    columnGap: 8,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#C67C4E",
    borderColor: "transparent",
    borderRadius: 30,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: 350,
    height: 45,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    fontWeight: "700",
    fontSize: 24,
    fontFamily: "Gudea-Bold",
    color: "rgba(255, 255, 255, 1)",
  },
  forgotPassword: {
    color: "#92a0a9",
    fontWeight: "700",
  },
  resetTypo: {
    color: "#313131",
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Gudea-Bold",
    fontWeight: "700",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Register;
