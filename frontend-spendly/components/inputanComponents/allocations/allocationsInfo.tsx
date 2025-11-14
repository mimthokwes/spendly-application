import { useUsers } from "@/contexts/usersContext";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLOR } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130, // tinggi tetap
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingTop: 20,
  },
  text: {
    color: COLOR.white,
  },
  wrapper: {
    width: "100%",
    height: "100%", // biar fix-height
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 25,
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  allocationItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 6,
    width: "100%",
    backgroundColor: COLOR.fourtiary,
    borderRadius: 15,
  },
  namePercentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  allocationName: {
    color: COLOR.white,
    fontSize: 14,
  },
  allocationPercent: {
    color: COLOR.white,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default function AllocationsInfo({ onEdit }: any) {
  const { loading, user } = useUsers();
  const [allocations, setAllocations] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && user?.allocation) {
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {allocations.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.allocationItem}
                onPress={() => onEdit(index, item)}
              >
                <View style={styles.namePercentRow}>
                  <Text style={styles.allocationName}>{item.name}</Text>
                  <Text style={styles.allocationPercent}>{item.percent}%</Text>
                </View>
              </TouchableOpacity>
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
