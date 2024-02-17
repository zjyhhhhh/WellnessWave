import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import { height, width } from "../../constants/Layout";
import RecordButton from "../../components/RecordButton";
import DailyHistoryRecord from "../../components/DailyHistory";
import { RecordStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
					<DailyHistoryRecord date="Today" />
					<DailyHistoryRecord date="Yesterday" />
					<DailyHistoryRecord date="31 Jan" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HistoryScreen;
