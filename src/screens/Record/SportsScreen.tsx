import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { RecordStackParamList } from "../../../types";
import SportsBarChart from "../../components/SportsBarChart";
import { format, parseISO } from "date-fns";
import { height, width } from "../../constants/Layout";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RecordStackParamList, "Sports">;

const styles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		padding: 0.04 * width,
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "space-between",
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
		height: 0.06 * height,
	},
});

const iconSize = 0.06 * width;
const SportsScreen = ({ navigation: { navigate } }: Props) => {
	return (
		<SafeAreaView>
			<View style={styles.header}>
				<AntDesign name="arrowleft" size={iconSize} color="black" />
				<AntDesign
					name="plus"
					size={iconSize}
					color="black"
					onPress={() => {
						navigate("SportsRecord");
					}}
				/>
			</View>
			<SportsBarChart />
		</SafeAreaView>
	);
};

export default SportsScreen;
