import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import {COLOR} from "../../constants/colors";
import { TransactionProvider } from "../../contexts/transactionsContext";

export default function TabsLayout() {
  return (
    <TransactionProvider>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#4e9bde",
        tabBarInactiveTintColor: COLOR.grey,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="dashboard"
              size={28}
              color={focused ? COLOR.tertiary  : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="catatan"
        options={{
          title: "Inputan",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="edit"
              size={28}
              color={focused ? COLOR.tertiary : color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="laporan"
        options={{
          title: "Laporan",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="bar-chart"
              size={28}
              color={focused ? COLOR.tertiary : color}
            />
          ),
        }}
      />
    </Tabs>
    </TransactionProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
    height: 80,
    marginHorizontal: 10,
    marginBottom: 30,
    borderTopWidth: 1.5,
    borderWidth: 1.5,
    borderColor: COLOR.white,
    shadowRadius: 10,
    paddingTop: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
});
