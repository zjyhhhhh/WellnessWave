import { View, Text, StyleSheet } from "react-native";
import { height, width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import DailyHistoryClass from "./DailyHistoryClass";

interface DailyHistoryRecordProps {
	date: string;
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
	dailyHistoryDetailContainer: {
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
});

const DailyHistoryRecord = ({ date }: DailyHistoryRecordProps) => {
	return (
		<View style={styles.dailyHistoryContainer}>
			<Text style={styles.dailyHistoryTitle}>{date}</Text>
			<View style={styles.dailyHistoryDetailContainer}>
				<DailyHistoryClass type="Diet" />
				<DailyHistoryClass type="Sports" />
			</View>
		</View>
	);
};

export default DailyHistoryRecord;
