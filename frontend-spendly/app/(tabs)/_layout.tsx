import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { COLOR } from "../../constants/colors";
import { TransactionProvider } from "../../contexts/transactionsContext";
import { UsersProvider } from "@/contexts/usersContext";
import { SavingsProvider } from "@/contexts/savingsContext";
import ChatBot from "../../components/chatbotComponents/chatBot";

export default function TabsLayout() {
  const [showActions, setShowActions] = useState(false);

  const handlePress = () => {
    setShowActions(!showActions);
    // di sini bisa buka modal, ActionSheet, atau jalankan animasi
  };

  return (
    <SavingsProvider>
      <UsersProvider>
        <TransactionProvider>
          <View style={{ flex: 1 }}>
            {/* Tabs utama */}
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
                      color={focused ? COLOR.tertiary : color}
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

            {/* Tombol melayang */}
            <TouchableOpacity
              style={styles.floatingButton}
              activeOpacity={0.8}
              onPress={handlePress}
            >
              <MaterialIcons name="flutter-dash" size={40} color={COLOR.white} />
            </TouchableOpacity>

            {/* Contoh aksi tambahan (bisa kamu ganti dengan modal/menu) */}
            {showActions && (
              <ChatBot />
            )}
          </View>
        </TransactionProvider>
      </UsersProvider>
    </SavingsProvider>
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
  floatingButton: {
    position: "absolute",
    bottom: 90, // sedikit di atas tab bar
    left: "18%",
    transform: [{ translateX: -45}, {translateY: -35}],
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: COLOR.tertiary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 99,
  },

  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLOR.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
