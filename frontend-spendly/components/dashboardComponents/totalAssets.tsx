import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/colors";
import { ENV } from "../../env";
import { getToken } from "../../lib/authStore"; // 🔥 ambil token langsung dari store

export default function TotalAssets() {
 // const { token } = useAuth();
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const token = getToken(); // 🔥 ambil token dari global variable

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        // bulan sebelumnya
        const prev = new Date(currentYear, now.getMonth() - 1, 1);
        const prevYear = prev.getFullYear();
        const prevMonth = prev.getMonth() + 1;

        // Fetch data bulan ini
        const currentRes = await fetch(
          `${ENV.API_URL}/transactions?year=${currentYear}&month=${currentMonth}`,
          { method: "GET", 
            headers: { "Content-Type": "application/json",
               Authorization: `Bearer ${token}` 
            } }
        );
        const currentData = await currentRes.json();

        // Fetch data bulan lalu
        const prevRes = await fetch(
          `${ENV.API_URL}/transactions?year=${prevYear}&month=${prevMonth}`,
          { method: "GET", 
            headers: { "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
           } }
        );
        const prevData = await prevRes.json();

        const SaldoLast = await fetch(`${ENV.API_URL}/transactions`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        const Saldo = await SaldoLast.json();

        // Hitung total asset bulan ini
        const calcTotal = (arr: any[]) => {
          const income = arr
            .filter((t) => t.type === "income")
            .reduce((a, b) => a + (b.nominal || 0), 0);
          const spending = arr
            .filter((t) => t.type === "spending")
            .reduce((a, b) => a + (b.nominal || 0), 0);
          return income - spending;
        };

        const totalNow = calcTotal(
          Array.isArray(currentData.data) ? currentData.data : []
        );
        const totalPrev = calcTotal(
          Array.isArray(prevData.data) ? prevData.data : []
        );
        const totalSaldo = calcTotal(
          Array.isArray(Saldo.data) ? Saldo.data : [])

        setTotalAssets(totalSaldo);

        // Hitung persentase perubahan
        let percentage = 0;
        if (totalPrev !== 0) {
          percentage = ((totalNow - totalPrev) / totalPrev) * 100;
        }
        setPercentageChange(percentage);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.white} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.label}>Total Assets</Text>
            <Text style={styles.value}>
              Rp {totalAssets?.toLocaleString("id-ID")}
            </Text>
            {percentageChange !== null && (
              <Text
                style={[
                  styles.info,
                  { color: percentageChange >= 0 ? COLOR.green : COLOR.red },
                ]}
              >
                {percentageChange >= 0 ? "Naik" : "Turun"}{" "}
                {Math.abs(percentageChange).toFixed(1)}% dari bulan lalu
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.icon}>
        <MaterialIcons name="visibility" size={36} color={COLOR.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flexDirection: "row",
    height: 170,
    width: "95%",
    backgroundColor: COLOR.secondary,
    marginTop: 70,
    borderRadius: 25,
    justifyContent: "space-between",
    padding: 20,
  },
  container: {},
  content: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: 10,
  },
  label: {
    color: COLOR.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  value: {
    color: COLOR.white,
    fontSize: 28,
    fontWeight: "bold",
  },
  info: {
    fontSize: 12,
    fontWeight: "600",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
