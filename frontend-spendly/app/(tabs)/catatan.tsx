import AllocationsInfo from "@/components/inputanComponents/allocations/allocationsInfo";
import AllocationsMoney from "@/components/inputanComponents/allocations/addAllocationsMoney";
import Allocations from "@/components/inputanComponents/allocations";
import { StyleSheet, View, ScrollView } from "react-native";
import { COLOR } from "../../constants/colors";
import OptionsCatatan from "@/components/inputanComponents/optionsCatatan";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    backgroundColor: COLOR.primary,
  },
  text: {
    color: COLOR.white,
  },
  ScrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    alignItems: "center", 
    paddingBottom: 20,
  },
});

export default function CatatanSceen() {
  return (
    <View style={styles.container}>
      {/* <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false} 
      > */}
        <Allocations />
        <OptionsCatatan />
        {/* </ScrollView> */}
    </View>
  );
}
