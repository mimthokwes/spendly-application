import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "../../contexts/transactionsContext";

export default function TotalAssets({ 
  onChangePercentage,
  visible, 
  setVisible 
}: { 
  onChangePercentage: (val: number | null) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const { transactions, loading } = useTransactions();
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  //const [loading, setLoading] = useState(true);

  const hadleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (!loading && transactions.length > 0) {
      const now = new Date();
      const currentMonth = now.getMonth(); // 0–11
      const currentYear = now.getFullYear();

      // 🔥 Hitung bulan & tahun sebelumnya dengan aman
      const prev = new Date(currentYear, currentMonth -1 , 1);
      const prevMonth = prev.getMonth(); 
      const prevYear = prev.getFullYear(); 


      const currentMonthTx = transactions.filter((t: { date: Date }) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
    //  console.log(currentMonthTx,currentMonth, currentYear);

      const prevMonthTx = transactions.filter((t: { date: Date }) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === prevMonth && d.getFullYear() === prevYear
        );
      });

     // console.log(prevMonthTx,prevMonth , prevYear);

      const calcTotal = (arr: any[]) => {
        const income = arr
          .filter((t) => t.type === "income")
          .reduce((a, b) => a + b.nominal, 0);
        const spending = arr
          .filter((t) => t.type === "spending")
          .reduce((a, b) => a + b.nominal, 0);
        return income - spending;
      };

      const totalNow = calcTotal(currentMonthTx);
      const totalPrev = calcTotal(prevMonthTx);
      const totalSaldo = calcTotal(transactions);
    //  console.log(totalNow, totalPrev, totalSaldo);

      setTotalAssets(totalSaldo);

      if (totalPrev !== 0) {
        const percentage = ((totalNow - totalPrev) / totalPrev) * 100;
        setPercentageChange(percentage);
        onChangePercentage(percentage);
      } else {
        setPercentageChange(null);
        onChangePercentage(null);
      }
    }
  }, [transactions, loading]);

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={COLOR.white} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.label}>Total Assets</Text>
            {visible ? (
              <Text style={styles.value}>
              Rp {totalAssets.toLocaleString("id-ID")}
            </Text>
            ) : (
              <Text style={styles.value}>Rp ***** </Text>
            )}
            {percentageChange !== null && (
              <Text
                style={[
                  styles.info,
                  { color: percentageChange >= 0 ? COLOR.green : COLOR.red },
                ]}
              > Asset Grow Rate {""}
                {percentageChange >= 0 ? "Naik" : "Turun"}{" "}
                {Math.abs(percentageChange).toFixed(1)}%
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.icon}>
        <Pressable onPress={hadleVisible}>
          {visible ? (
            <MaterialIcons name="visibility" size={36} color={COLOR.white} />
          ) : (
            <MaterialIcons name="visibility-off" size={36} color={COLOR.white} />
          )}
        </Pressable>
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
    marginTop: 60,
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
