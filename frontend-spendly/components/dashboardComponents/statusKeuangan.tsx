import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useTransactions } from "../../contexts/transactionsContext";

export default function StatusKeuangan() {
  const { transactions, loading } = useTransactions();
  const [percentIncome, setPercentIncome] = useState(0);
  const [percentSpending, setPercentSpending] = useState(0);
  const [moneyLeftPercent, setMoneyLeftPercent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        if (!loading && transactions.length > 0) {
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth();
    
          const currentMonthTx = transactions.filter((t: { date: Date }) => {
            const d = new Date(t.date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
          });
          const totalIncome = currentMonthTx
            .filter((item: any) => item.type === "income")
            .reduce((a: any, b: any) => a + b.nominal, 0);
          const totalSpending = currentMonthTx
            .filter((item: any) => item.type === "spending")
            .reduce((a: any, b: any) => a + b.nominal, 0);
    
          const income = (totalIncome);
          const spending = (totalSpending);

    
          setPercentIncome(( (income - spending)/ income) * 100);
          setPercentSpending((spending / income) * 100);
    
          const calcTotal = (arr: any[]) => {
            const income = arr
              .filter((t) => t.type === "income")
              .reduce((a, b) => a + b.nominal, 0);
            const spending = arr
              .filter((t) => t.type === "spending")
              .reduce((a, b) => a + b.nominal, 0);
            return income - spending;
          };
    
          setMoneyLeftPercent((calcTotal(currentMonthTx) / totalIncome) * 100)
        }
    };
    fetchData();
  });
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="bar-chart"
            size={38}
            color={COLOR.white}
            marginRight={0}
          />
          <Text style={styles.text}>Status Keuangan</Text>
        </View>
        <View style={styles.status}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLOR.white,
            }}
          >
            {Math.abs(moneyLeftPercent).toFixed(0)}%
          </Text>
        </View>
      </View>
      <View style={styles.statusFill}>
        <View style={[styles.income,{width: `${percentIncome}%`}]}></View>
        <View style={[styles.spending,{width: `${percentSpending}%`}]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 140,
    backgroundColor: COLOR.secondary,
    borderRadius: 15,
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOR.white,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  status: {
    backgroundColor: COLOR.tertiary,
    width: 60,
    height: 60,
    borderRadius: 15,
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  statusFill: {
    flexDirection: "row",
    width: "95%",
    height: 20,
    marginTop: 10,
  },
  income: {
    backgroundColor: COLOR.green,
    borderRadius: 10,

  },
  spending: {
    backgroundColor: COLOR.red,
    borderRadius: 10,
  },
});
