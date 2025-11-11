import { useUsers } from "@/contexts/usersContext";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { COLOR } from "../../../constants/colors";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    color: COLOR.white,
  },
  wrapper: {
    width: "100%",
    borderRadius: 25,
    paddingTop: 30,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  allocationItem: {
    backgroundColor: COLOR.black,
    width: screenWidth / 3.5, // sekitar 3 item per baris
    height: 60,
    margin: 5,
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
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : allocations.length > 0 ? (
        <View style={styles.wrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer}
          >
            {allocations.map((item, index) => (
              <View key={index} style={styles.allocationItem}>
                <Text style={styles.allocationName}>{item.name}</Text>
                <Text style={styles.allocationPercent}>{item.percent}%</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <Text style={styles.text}>No allocations found</Text>
        </View>
      )}
    </View>
  );
}
