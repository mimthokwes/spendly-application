import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/colors";
import { useTransactions } from "../../contexts/transactionsContext";
import { getToken } from "../../contexts/authStore";
import { ENV } from "../../env";

export default function TransactionsInfo() {
  const { transactions, loading } = useTransactions();
  //const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && transactions.length > 0) {
        try {
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth();

          const currentMonthTx = transactions.filter((t: { date: Date }) => {
            const d = new Date(t.date);
            return (
              d.getMonth() === currentMonth && d.getFullYear() === currentYear
            );
          });

          const totalIncome = currentMonthTx
          .filter((item: any) => item.type === "income")
          .reduce((a: any, b: any) => a + b.nominal,0)
          const totalSpending = currentMonthTx
          .filter((item: any) => item.type === "spending")
          .reduce((a: any, b: any) => a + b.nominal, 0);

          setIncome(totalIncome);
          setSpending(totalSpending);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [transactions, loading]);
  return (
    <View style={styles.container}>
      <View style={styles.income}>
        <View style={styles.title}>
          <MaterialIcons name="call-made" size={20} color={COLOR.green} />
          <Text style={styles.textTitle}>Income</Text>
        </View>
        <Text style={styles.textIncome}>
          Rp {income?.toLocaleString("id-ID")}
        </Text>
        <Text style={styles.text}>Bulan ini</Text>
      </View>
      <View style={styles.spending}>
        <View style={styles.title}>
          <MaterialIcons name="call-received" size={20} color={COLOR.red} />
          <Text style={styles.textTitle}>Spending</Text>
        </View>
        <Text style={styles.textSpending}>
          Rp {spending?.toLocaleString("id-ID")}
        </Text>
        <Text style={styles.text}>Bulan ini</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    //  backgroundColor: "#fff",
    width: "95%",
    height: 90,
    marginTop: 10,
  },
  textIncome: {
    color: COLOR.green,
    fontSize: 18,
  },
  textSpending: {
    color: COLOR.red,
    fontSize: 18,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 3,
  },
  textTitle: {
    color: COLOR.white,
    fontSize: 18,
    marginLeft: 5,
  },
  text: {
    marginTop: 5,
    color: COLOR.white,
    fontSize: 12,
  },
  income: {
    backgroundColor: COLOR.secondary,
    width: "48.5%",
    borderRadius: 15,
    //alignItems:"center",
    // marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  spending: {
    backgroundColor: COLOR.secondary,
    width: "48.5%",
    borderRadius: 15,
    paddingHorizontal: 20,
  },
});
