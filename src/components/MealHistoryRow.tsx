import { View, Text, StyleSheet } from "react-native";
import { height, width } from "../constants/Layout";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { foodIcons } from "../constants/FoodIcons";

interface MealHistoryRowProps {
	iconName: string;
	text: string;
}

const styles = StyleSheet.create({
	dailyHistoryDetailClassContentRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 0.008 * width,
	},
	dailyHistoryDetailClassContentIcon: {
		backgroundColor: Colors.background,
		padding: 0.01 * width,
		marginRight: 0.01 * width,
		borderRadius: 0.02 * width,
		width: 0.08 * width,
		height: 0.08 * width,
	},
	dailyHistoryDetailClassContentText: {
		fontSize: FontSize.small,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.01 * width,
	},
});

const iconSize = width * 0.065;

const MealHistoryRow = ({ iconName, text }: MealHistoryRowProps) => {
	const IconComponent = foodIcons[iconName];
	return (
		<View style={styles.dailyHistoryDetailClassContentRow}>
			<View style={styles.dailyHistoryDetailClassContentIcon}>
				{IconComponent && <IconComponent height={iconSize} width={iconSize} />}
			</View>
			<Text style={styles.dailyHistoryDetailClassContentText}>{text}</Text>
		</View>
	);
};

export default MealHistoryRow;
