import { useUsers } from "@/contexts/usersContext";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../../constants/colors";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  text: {
    color: COLOR.white,
  },
  wrapper: {
 //   backgroundColor: COLOR.secondary,
    width: "100%",
   // minHeight: 200,
    borderRadius: 25,
    paddingTop: 30,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flexDirection: "row",
   // flexWrap: "wrap",
    justifyContent: "center",
  },
  allocationItem: {
    backgroundColor: COLOR.black,
    width: screenWidth / 3.5, // 👈 sekitar 3 item per baris
    height: 60,
    margin: 6,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  allocationName: {
    color: COLOR.white,
    fontSize: 14,
  },
  allocationPercent: {
    color: COLOR.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default function AllocationsInfo() {
  const { loading, user } = useUsers();
  const [allocations, setAllocations] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user && user.allocation) {
      setAllocations(user.allocation);
    }
  }, [loading, user]);

  return (
    <View>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : allocations.length > 0 ? (
        <View style={styles.wrapper}>
          <View style={styles.gridContainer}>
            {allocations.map((item, index) => (
              <View key={index} style={styles.allocationItem}>
                <Text style={styles.allocationName}>{item.name}</Text>
                <Text style={styles.allocationPercent}>{item.percent}%</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No allocations found</Text>
      )}
    </View>
  );
}
