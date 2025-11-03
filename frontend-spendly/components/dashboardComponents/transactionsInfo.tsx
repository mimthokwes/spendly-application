import React,{useEffect,useState} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import {COLOR} from '../../constants/colors';
import { ENV } from "../../env";
import { getToken } from "../../lib/authStore";


export default function TransactionsInfo() {
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = getToken();
    
                const now = new Date();
                const currentYear = now.getFullYear();
                const currentMonth = now.getMonth() + 1;
                const res = await fetch(`${ENV.API_URL}/transactions?year=${currentYear}&month=${currentMonth}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });

                const data = await res.json();

                const dataIncome = data.data.filter((item: any) => item.type === "income");
                const dataSpending = data.data.filter((item: any) => item.type === "spending");

                setIncome(dataIncome.reduce((acc: any, item: any) => acc + item.nominal, 0));
                setSpending(dataSpending.reduce((acc: any, item: any) => acc + item.nominal, 0));
                setLoading(false);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.income}>
                <View style={styles.title}>
                <MaterialIcons name="call-made" size={20} color={COLOR.green} />
                <Text style={styles.textIncome}>Income</Text>
                </View>
                <Text style={styles.textIncome}>Rp {income?.toLocaleString("id-ID")}</Text>
                <Text style={styles.text}>Bulan ini</Text>
            </View>
            <View style={styles.spending}>
                <View style={styles.title}>
                <MaterialIcons name="call-received" size={20} color={COLOR.red} />
                <Text style={styles.textSpending}>Spending</Text>
                </View>
                <Text style={styles.textSpending}>Rp {spending?.toLocaleString("id-ID")}</Text>
                <Text style={styles.text}>Bulan ini</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      //  backgroundColor: "#fff",
        width: "95%",
        height: 90,
        marginTop: 10,
    },
    textIncome:{
        color: COLOR.green,
        fontSize:18,
    },
    textSpending: {
        color: COLOR.red,
        fontSize:18,
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 3,
    },
    text: {
        marginTop:5,
        color: COLOR.white,
        fontSize: 12,
    },
    income: {
        backgroundColor:COLOR.secondary,
        width: "48.5%",
        borderRadius: 15,
        //alignItems:"center",
       // marginHorizontal: 5,
       paddingHorizontal:20,
    },
    spending: {
        backgroundColor:COLOR.secondary,
        width: "48.5%",
        borderRadius: 15,
        paddingHorizontal:20,
    }
})