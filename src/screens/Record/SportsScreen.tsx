import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { RecordStackParamList } from "../../../types";
import SportsBarChart from "../../components/Record/Sports/SportsBarChart";
import { format, parseISO } from "date-fns";
import { height, width } from "../../constants/Layout";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ActivityGrowthBarChart from "../../components/Record/Sports/ActivityGrowthBarChart";
import FontSize from "../../constants/FontSize";
import SportsTypePieChart from "../../components/Record/Sports/SportsTypePieChart";

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
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<AntDesign
					name="arrowleft"
					size={iconSize}
					color="black"
					onPress={() => {
						navigate("History");
					}}
				/>
				<AntDesign
					name="plus"
					size={iconSize}
					color="black"
					onPress={() => {
						navigate("SportsRecord");
					}}
				/>
			</View>
			{/* <SportsBarChart /> */}
			<View style={{ flex: 1 }}>
				<View
					style={{
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: height * 0.45,
						paddingHorizontal: width * 0.08,
						paddingVertical: height * 0.02,
					}}
				>
					<View
						style={{
							height: "100%",
							width: "100%",
							borderRadius: 20,
							shadowColor: "#000",
							backgroundColor: "#fffff8",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 4,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "flex-start",
								paddingTop: "5%",
								paddingHorizontal: "10%",
							}}
						>
							<Text
								style={{
									zIndex: 100,
									color: "black",
									fontSize: FontSize.large,
									fontFamily: Font["poppins-semiBold"],
								}}
							>
								Activity Growth
							</Text>
						</View>
						<ActivityGrowthBarChart />
					</View>
					<View style={{ flex: 1 }}>
						<SportsTypePieChart />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SportsScreen;
