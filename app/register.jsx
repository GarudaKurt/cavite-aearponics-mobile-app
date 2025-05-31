import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
//import { useAuthStore } from "./store/zustand";
const Register = () => {
  const testInputs = /^[^<>&/=]*$/;
  const router = useRouter();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select role"); // Role state
  const [hideShow, setHideShow] = useState(true);
  const [wrongPass, setWrongPass] = useState(false);
  const [warnMessage, setWarnMessage] = useState("");

  //const signUp = useAuthStore((state) => state.signUp);

  const securityTest = (text) => {
    const isValid = testInputs.test(text);
    return isValid;
  };

  const passHideShow = () => {
    setHideShow(!hideShow);
  };

  const handleCredentials = async () => {
    if (!name || !email || !password || role === "default") {
      setWarnMessage(
        "Validation Error",
        "Please fill all fields and select a role.",
      );
      return;
    }

    if (!securityTest(email) || !securityTest(password)) {
      setWarnMessage("Validation Error", "Invalid email or password format.");
      return;
    }

    try {
      //await signUp(email,password, name, role )
      router.push("(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
      setWarnMessage(
        "Registration Failed",
        error.message || "Please try again.",
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.loginscreen}>
        <Text style={styles.welcomeBack}>Register</Text>

        {wrongPass && <Text style={styles.errorText}>{warnMessage}</Text>}

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

        <View style={styles.signUpContainer}>
          <Text style={styles.forgotPassword}>Already have an account?</Text>
          <Link href="/" asChild>
            <Text style={styles.resetTypo}>LogIn</Text>
          </Link>
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
});

export default Register;
