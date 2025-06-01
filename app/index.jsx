import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../config/firebaseConfig";

const Home = () => {
  const testInputs = /^[^<>&/=]*$/;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideShow, setHideShow] = useState(true);
  const [warnMessage, setWarnMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const securityTest = (text) => testInputs.test(text);

  const passHideShow = () => setHideShow(!hideShow);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
      return true;
    } catch (error) {
      console.error("Error during signin:", error.message);
      return false;
    }
  };

  const handleCredentials = async () => {
    if (!securityTest(email) || !securityTest(password)) {
      setWarnMessage("Invalid email or password format");
      return;
    }

    setLoading(true);
    const success = await signIn(email, password);
    setLoading(false);

    if (success) {
      setWarnMessage("Success login");
      router.push("(tabs)/home");
    } else {
      setWarnMessage("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginscreen}>
        <Text style={styles.welcomeBack}>Welcome</Text>

        {warnMessage ? <Text style={styles.errorText}>{warnMessage}</Text> : null}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.select({ ios: 8, android: 500 })}
        >
          <View style={styles.inputForm}>
            <TextInput
              style={[styles.inputFormChild, styles.inputShadowBox]}
              placeholder="Email"
              placeholderTextColor="#92a0a9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
              <TouchableOpacity onPress={passHideShow} style={styles.iconContainer}>
                <Ionicons name={hideShow ? "eye-off" : "eye"} size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signInWrapper}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttons} onPress={handleCredentials} disabled={loading}>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.buttonTitle}>  Login</Text>
                  </View>
                ) : (
                  <Text style={styles.buttonTitle}>Login</Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.signUpContainer}>
          <Text style={styles.forgotPassword}>Don’t have an account?</Text>
          <Link href="/register" asChild>
            <Text style={styles.resetTypo}>Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardAvoidingView: { width: "100%", alignItems: "center" },
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
  resetTypo: {
    color: "#313131",
    textAlign: "left",
    fontSize: 15,
    fontFamily: "Gudea-Bold",
    fontWeight: "700",
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
  inputFormChild: {
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 14,
  },
  inputFormItem: {
    alignItems: "center",
    paddingHorizontal: 19,
    paddingVertical: 14,
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
  forgotPassword: {
    color: "#92a0a9",
    fontWeight: "700",
  },
  inputForm: {
    height: 115,
    marginTop: 16,
    alignItems: "center",
  },
  signInWrapper: {
    marginTop: 16,
  },
  signUpContainer: {
    marginTop: 60,
    flexDirection: "row",
    columnGap: 8,
  },
  loginscreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    justifyContent: "center",
  },
  errorText: {
    color: "#CA0404",
    fontWeight: "bold",
    marginTop: 10,
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
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Home;
