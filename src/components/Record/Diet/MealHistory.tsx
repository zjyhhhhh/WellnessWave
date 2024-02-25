import { View, Text, StyleSheet } from "react-native";
import { height, width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import MealHistoryRow from "./MealHistoryRow";

interface MealHistoryProps {
	type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
	data: string[];
}

const styles = StyleSheet.create({
	dailyHistoryContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.secondary,
		marginHorizontal: 0.05 * width,
		paddingVertical: 0.02 * width,
		paddingHorizontal: 0.05 * width,
		borderRadius: 0.03 * width,
		marginBottom: 0.02 * height,
	},
	dailyHistoryTitle: {
		fontSize: FontSize.large,
		paddingTop: 0.015 * width,
		color: Colors.text,
		fontFamily: Font["poppins-semiBold"],
		alignSelf: "flex-start",
	},
	dailyHistoryContentContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0.01 * width,
		alignSelf: "flex-start",
	},
});

const MealHistory = ({ type, data }: MealHistoryProps) => {
	return (
		<View style={styles.dailyHistoryContainer}>
			<Text style={styles.dailyHistoryTitle}>{type}</Text>
			<View style={styles.dailyHistoryContentContainer}>
				{data.map((item, index) => (
					<MealHistoryRow key={index} food={item} />
				))}
			</View>
		</View>
	);
};

export default MealHistory;
