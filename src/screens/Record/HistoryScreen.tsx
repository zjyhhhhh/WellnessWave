import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import { height, width } from "../../constants/Layout";
import RecordButton from "../../components/Record/RecordButton";
import DailyHistoryRecord from "../../components/Record/History/DailyHistory";
import { RecordStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatDateToRelativeDay } from "../../utils/dateFormater";

type Props = NativeStackScreenProps<RecordStackParamList, "History">;

const styles = StyleSheet.create({
	newRecordContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0.04 * height,
		marginBottom: 0.03 * height,
	},
});

const data = [
	{
		date: "2024-02-02",
		diet: ["Milk", "Sandwich"],
		sports: ["Running", "Swimming", "Baseball"],
	},
	{
		date: "2024-02-01",
		diet: ["Milk", "Sandwich"],
		sports: ["Boxing", "Soccer"],
	},
	{
		date: "2024-01-31",
		diet: ["Milk", "Peanut", "Pizza", "Pudding"],
		sports: ["Badminton", "Swimming", "Running"],
	},
];

const HistoryScreen = ({ navigation: { navigate } }: Props) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
				<View style={styles.newRecordContainer}>
					<RecordButton
						type="Diet"
						pressHandler={() => {
							navigate("Diet");
						}}
					/>
					<RecordButton
						type="Sports"
						pressHandler={() => {
							navigate("Sports");
						}}
					/>
					<RecordButton type="Health" />
				</View>
				<View>
					{data.map((item, index) => (
						<DailyHistoryRecord
							key={index}
							date={formatDateToRelativeDay(item.date)}
							diet={item.diet}
							sports={item.sports}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HistoryScreen;
