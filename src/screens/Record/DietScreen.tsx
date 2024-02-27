import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { RecordStackParamList } from "../../../types";
import RecordMealButton from "../../components/Record/Diet/RecordMealButton";
import { height, width } from "../../constants/Layout";
import MealHistory from "../../components/Record/Diet/MealHistory";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RecordStackParamList, "Diet">;

const styles = StyleSheet.create({
	newRecordContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginVertical: 0.02 * height,
		marginHorizontal: 0.05 * width,
	},
});

const getUserToken = async () => {
	const userToken = await AsyncStorage.getItem("userToken");
	return userToken;
};

const DietScreen = ({ navigation }: Props) => {
	const dateNow = new Date();
	const isFocused = useIsFocused();
	const [selectedDate, setSelectedDate] = useState<Date>(new Date(dateNow));
	const [userToken, setUserToken] = useState<string | null>(null);
	const [diets, setDiets] = useState({
		breakfast: [],
		lunch: [],
		dinner: [],
		snack: [],
	});
	const [localDate, setLocalDate] = useState<string>("");

	getUserToken().then((token) => setUserToken(token));

	const fetchData = async () => {
		const response = await fetch(`http://127.0.0.1:8000/get_user_diet/${localDate}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${userToken}`,
			},
		});
		if (response.ok) {
			const data = await response.json();
			setDiets(data.diets);
			console.log(data.diets);
		} else {
			console.log("error");
		}
	};

	useEffect(() => {
		const newLocalDate = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			selectedDate.getDate()
		);
		setLocalDate(newLocalDate.toISOString().split(".")[0]);
		if (userToken && isFocused) {
			fetchData();
		}
	}, [selectedDate, userToken, isFocused]);

	const recordHandler = (type: string) => {
		navigation.navigate("DietRecord", {
			date: localDate,
			type: type,
		});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<DatePickerHeader
				onDateChange={(date: Date) => {
					setSelectedDate(date);
				}}
				backHandler={() => navigation.goBack()}
			/>
			<View style={styles.newRecordContainer}>
				<RecordMealButton type="Breakfast" pressHandler={() => recordHandler("Breakfast")} />
				<RecordMealButton type="Lunch" pressHandler={() => recordHandler("Lunch")} />
				<RecordMealButton type="Dinner" pressHandler={() => recordHandler("Dinner")} />
				<RecordMealButton type="Snack" pressHandler={() => recordHandler("Snack")} />
			</View>
			<View>
				<MealHistory type="Breakfast" data={diets.breakfast} />
				<MealHistory type="Lunch" data={diets.lunch} />
				<MealHistory type="Dinner" data={diets.dinner} />
				<MealHistory type="Snack" data={diets.snack} />
			</View>
		</SafeAreaView>
	);
};

export default DietScreen;
