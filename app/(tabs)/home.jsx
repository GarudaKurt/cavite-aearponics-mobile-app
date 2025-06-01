
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { database } from "../../config/firebaseConfig";


const  Home = () => {
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("")
  const [temperature, setTemperature] = useState("")
  const [humidity, setHumidity] = useState("")
  const [pHLevel, setPhLevel] = useState("")
  const [loading, setLoading] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
 
  const router = useRouter()
  
  useEffect(() => {
    const dataRef = ref(database, "monitoring");

    // Fetch data
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      const fetchedData = snapshot.val();

      if (fetchedData) {
        setTemperature(fetchedData.temperature)
        setHumidity(fetchedData.humidity)
        setPhLevel(fetchedData.phlevel)
        setDate(fetchedData.date);
        setTime(fetchedData.time);

      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [temperature, humidity, pHLevel, time, date]); 

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const toggleSwitch = () => {
    setIsOn((prev) => {
      const newState = !prev;
     
      // Update the value in Firebase Realtime Database
      const stateRef = ref(database, "monitoring/state");
      set(stateRef, newState)
        .then(() => console.log("State updated successfully"))
        .catch((error) => console.error("Error updating state:", error));
  
      Animated.timing(slideAnim, {
        toValue: newState ? 30 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      return newState;
    });
  };

  const handleLogout = () => {
    console.warn("Test logout")
    router.push("/")
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.gasLevelRow}>
          <Text style={styles.labelText}>Aearoponics</Text>
          <View style={styles.indicator}>
            <Ionicons name="information-circle" size={24} color="#4A4A4A" />
          </View>
        </View>

        <View style={styles.dateTimeRow}>
          <Text style={styles.dateText}>
            Humidity: {humidity} <Ionicons name="water" size={16} color="#4A4A4A" />
          </Text>
          <Text style={styles.dateText}>
            Temperature: {temperature} <Ionicons name="thermometer" size={16} color="#4A4A4A" />
          </Text>
          <Text style={styles.dateText}>
            pHLevel: {pHLevel} <Ionicons name="flask" size={16} color="#4A4A4A" />
          </Text>
          <Text style={styles.timeText}>Date: {date}</Text>
          <Text style={styles.timeText}>Time: {time}</Text>
        </View>


        <View style={styles.switchContainer}>
          <Text style={styles.statusLabel}>{isOn ? "ON" : "OFF"}</Text>
          <TouchableOpacity style={styles.switch} onPress={toggleSwitch}>
            <Animated.View style={[styles.slider, { left: slideAnim }]} />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.signInWrapper}>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.buttons} onPress={()=>{handleLogout()}}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </Pressable>
            </View>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
  },
  cardContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignSelf: "center",
  },
  gasLevelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  labelText: {
    fontSize: 24,
    color: "#4A4A4A",
    fontWeight: "bold",
  },
  gasValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#4A4A4A",
  },
  dateTimeRow: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    color: "#4A4A4A",
  },
  statusButton: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  switch: {
    width: 60,
    height: 30,
    backgroundColor: "#ddd",
    borderRadius: 30,
    padding: 3,
    justifyContent: "center",
  },
  slider: {
    width: 28,
    height: 28,
    backgroundColor: "#fff",
    borderRadius: 14,
    position: "absolute",
    top: 1,
  },
  buttonContainer: {
    top: 100,
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
});

export default Home