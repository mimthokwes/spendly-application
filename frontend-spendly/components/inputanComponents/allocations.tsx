// allocations.tsx
import AllocationsInfo from "./allocations/allocationsInfo";
import AllocationsMoney from "./allocations/addAllocationsMoney";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "../../constants/colors";
import { useUsers } from "@/contexts/usersContext";

export default function Allocations() {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");
  const { user, updateUser } = useUsers();

  const handleClick = () => setAdd(!add);

  const handleAddAllocation = async () => {
    if (!name.trim() || !percent.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const percentNum = parseFloat(percent);
    if (isNaN(percentNum) || percentNum <= 0) {
      Alert.alert("Error", "Please enter a valid percentage");
      return;
    }

    const totalPercent = (user?.allocation || []).reduce(
      (acc, a) => acc + a.percent,
      0
    );

    if (totalPercent + percentNum > 100) {
      Alert.alert("Error", "Total percentage cannot exceed 100%");
      return;
    }

    const newAllocation = { name, percent: percentNum };
    const updatedAllocations = [...(user?.allocation || []), newAllocation];

    try {
      await updateUser({ allocation: updatedAllocations });
      Alert.alert("Success", "Allocation added successfully");
      setName("");
      setPercent("");
      setAdd(false); // kembali ke mode info
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {add ? (
        <>
          <AllocationsMoney
            name={name}
            percent={percent}
            onChangeName={setName}
            onChangePercent={setPercent}
          />

          {/* 🔥 Tombol ini sekarang benar-benar menjalankan add */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAllocation}
          >
            <Text style={styles.addText}>Add Allocation</Text>
          </TouchableOpacity>
        </>
      ) : (
        <AllocationsInfo />
      )}

      <MaterialIcons
        name={add ? "close" : "add"}
        size={30}
        color="#ffffff"
        onPress={handleClick}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.secondary,
    width: "100%",
    padding: 10,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: COLOR.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
   // marginTop: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    //top: 15,
    bottom: 4,
    right: 25,
  },
});
