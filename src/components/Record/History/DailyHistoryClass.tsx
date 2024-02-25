import { View, Text, StyleSheet } from "react-native";
import { width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import { AntDesign } from "@expo/vector-icons";
import FoodIconComponent from "../../../constants/FoodIcons";

interface DailyHistoryClassProps {
	type: "Diet" | "Sports";
	data: string[];
	IconComponent: React.ElementType;
}

const styles = StyleSheet.create({
	dailyHistoryDetailClassContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		marginTop: 0.02 * width,
		backgroundColor: "rgba(255, 255, 255, 0.17)",
		width: 0.85 * width,
		paddingHorizontal: 0.03 * width,
		paddingVertical: 0.02 * width,
		borderRadius: 0.03 * width,
	},
	dailyHistoryDetailClassHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	dailyHistoryDetailClassTitle: {
		fontSize: FontSize.medium,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
	},
	dailyHistoryDetailClassContentContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 0.01 * width,
	},
	dailyHistoryDetailClassContentRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 0.008 * width,
	},
	dailyHistoryDetailClassContentText: {
		fontSize: FontSize.small,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.01 * width,
	},
});

interface RowProps {
	iconName: string;
	IconComponent: React.ElementType;
}

const Row = ({ iconName, IconComponent }: RowProps) => {
	const iconSize = width * 0.058;

	return (
		<View style={styles.dailyHistoryDetailClassContentRow}>
			<IconComponent activity={iconName} iconSize={iconSize} />
			<Text style={styles.dailyHistoryDetailClassContentText}>{iconName}</Text>
		</View>
	);
};

const DailyHistoryClass = ({ type, data, IconComponent }: DailyHistoryClassProps) => {
	return (
		<View style={styles.dailyHistoryDetailClassContainer}>
			<View style={styles.dailyHistoryDetailClassHeader}>
				<Text style={styles.dailyHistoryDetailClassTitle}>{type}</Text>
				<AntDesign name="arrowright" size={16} color={Colors.darkGray} />
			</View>
			<View style={styles.dailyHistoryDetailClassContentContainer}>
				{data.map((item) => (
					<Row iconName={item} IconComponent={IconComponent} key={item} />
				))}
			</View>
		</View>
	);
};

export default DailyHistoryClass;
