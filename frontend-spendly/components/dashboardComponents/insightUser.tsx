import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.secondary,
    height: 170,
    width: "95%",
    borderRadius: 25,
    marginTop: 10,
    //  justifyContent: "center",
    // alignItems: "center",
    paddingLeft: 30,
    paddingTop: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    //marginTop: 3,
  },
  textTitle: {
    color: COLOR.white,
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default function InsightUser({
  percentageChange,
}: {
  percentageChange: number | null;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Insights</Text>
        <MaterialIcons
          name="insights"
          size={28}
          color={COLOR.white}
          marginLeft={10}
        />
      </View>
      <View style={[{flexDirection: "column"}]}>
        <AchivementList percentageChange={percentageChange} />
      </View>
    </View>
  );
}

const AchivementList = ({percentageChange}: {percentageChange: number | null}) => {
  return (
    <View>
      {percentageChange !== null && percentageChange >= 20 && (
          <View style={[{flexDirection: "row", alignItems: "center"}]}>
            <MaterialIcons 
            name="moving" 
            size={24} 
            color={COLOR.green} 
            marginRight={5}
            />
            <Text style={[{ color: percentageChange >= 0 ? COLOR.white : COLOR.grey }]}>
              Income anda {""}
              {percentageChange >= 0 ? "naik" : "turun"}{" "}
              {Math.abs(percentageChange).toFixed(1)}% dari bulan lalu
            </Text>
          </View>
        )}
    </View>
  );
};
