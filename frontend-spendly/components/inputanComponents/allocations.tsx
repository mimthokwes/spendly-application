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
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { user, updateUser } = useUsers();

  const handleClick = () => {
    setAdd(!add);

    // reset edit mode when closing
    if (add) {
      setEditIndex(null);
      setName("");
      setPercent("");
    }
  };

  const handleEdit = (index: number, item: any) => {
    setName(item.name);
    setPercent(String(item.percent));
    setEditIndex(index);
    setAdd(true);
  };

 const handleSave = async () => {
  const nameTrim = name.trim();
  const percentTrim = percent.trim();

  const allocations = user?.allocation || [];
  let updatedAllocations;

  // =======================
  //     DELETE MODE
  // =======================
  if (editIndex !== null && nameTrim === "" && percentTrim === "") {
    updatedAllocations = allocations.filter((_, i) => i !== editIndex);

    try {
      await updateUser({ allocation: updatedAllocations });
      Alert.alert("Deleted", "Allocation has been removed");

      setName("");
      setPercent("");
      setAdd(false);
      setEditIndex(null);
      return;
    } catch (err: any) {
      Alert.alert("Error", err.message);
      return;
    }
  }

  // =======================
  //  VALIDATION NORMAL MODE
  // =======================
  if (!nameTrim || !percentTrim) {
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  const percentNum = parseFloat(percentTrim);
  if (percentNum <= 0) {
    Alert.alert("Error", "Please enter a valid percentage");
    return;
  }

  // =======================
  //        EDIT MODE
  // =======================
  if (editIndex !== null) {
    updatedAllocations = [...allocations];
    updatedAllocations[editIndex] = { name: nameTrim, percent: percentNum };

    const total = updatedAllocations.reduce((acc, a) => acc + a.percent, 0);

    if (total > 100) {
      Alert.alert("Error", "Total percentage cannot exceed 100%");
      return;
    }
  }

  // =======================
  //        ADD MODE
  // =======================
  else {
    const total = allocations.reduce((acc, a) => acc + a.percent, 0);

    if (total + percentNum > 100) {
      Alert.alert("Error", "Total percentage cannot exceed 100%");
      return;
    }

    updatedAllocations = [...allocations, { name: nameTrim, percent: percentNum }];
  }

  // =======================
  //       SAVE CHANGES
  // =======================
  try {
    await updateUser({ allocation: updatedAllocations });

    Alert.alert(
      "Success",
      editIndex !== null ? "Allocation updated" : "Allocation added"
    );

    setName("");
    setPercent("");
    setAdd(false);
    setEditIndex(null);
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

          <TouchableOpacity style={styles.addButton} onPress={handleSave}>
            <Text style={styles.addText}>
              {editIndex !== null ? "Update Allocation" : "Add Allocation"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <AllocationsInfo onEdit={handleEdit} />
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
    padding: 20,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: COLOR.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    bottom: 0,
    right: 25,
  },
});
