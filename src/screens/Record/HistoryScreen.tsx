import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import { height, width } from "../../constants/Layout";
import RecordButton from "../../components/Record/RecordButton";
import DailyHistoryRecord from "../../components/Record/History/DailyHistory";
import { RecordStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { formatDateToRelativeDay } from "../../utils/dateFormater";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface HistoryRecord {
	date: string;
	diet: string[];
	sports: string[];
}

const getUserInfo = async () => {
	const userToken = await AsyncStorage.getItem("userToken");
	const username = await AsyncStorage.getItem("username");
	return { userToken, username };
};

const HistoryScreen = ({ navigation: { navigate } }: Props) => {
	const [data, setData] = useState<HistoryRecord[]>();

	useEffect(() => {
		const fetchData = async () => {
			const { userToken, username } = await getUserInfo();
			try {
				const response = await fetch(`http://127.0.0.1:8000/get_user_diets_sports/`, {
					method: "GET",
					headers: {
						Authorization: `${userToken}`,
					},
				});
				const jsonData = await response.json();
				console.log(jsonData);

				setData(jsonData);
			} catch (error) {
				console.error("Network error:", error);
			}
		};
		fetchData();
	}, []);

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
					<RecordButton
						type="Health"
						pressHandler={() => {
							navigate("HealthFrontPageScreen");
						}}
					/>
				</View>
				<View>
					{data?.map((item, index) => (
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
