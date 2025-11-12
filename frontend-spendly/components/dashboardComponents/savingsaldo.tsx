import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useSavings } from "@/contexts/savingsContext";

export default function SavingSaldo({ visible }: { visible: boolean }) {
  const { saving } = useSavings();
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Text style={styles.title}>Savings Balance</Text>
        <MaterialIcons name="savings" size={38} color={COLOR.white} />
      </View>
      <View style={{marginBottom:24}}>
        {visible ? (
          <Text style={styles.text}>
            Amount: Rp {saving?.total?.toLocaleString("id-ID") ?? 0}
          </Text>
        ) : (
          <Text style={styles.text}>Amount: Rp *****</Text>
        )}
      </View>
      <View >
        <Text style={styles.quote}>"Do not save what left after spending, but spend what left after saving"</Text>
        <Text style={styles.quoteName}>-- Warren Buffett</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 180,
    borderRadius: 25,
    marginTop: 10,
    //alignItems: "center",
    backgroundColor: COLOR.secondary,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.white,
    //  textAlign: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLOR.green,
    //  textAlign: "center",
    marginRight: 10,
  },
  quote: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLOR.white,
    //  textAlign: "center",
    marginRight: 10,
  },
  quoteName: {
    textAlign: "right",
    fontSize: 12,
    color: COLOR.grey,
    marginRight: 30,
  }
});
