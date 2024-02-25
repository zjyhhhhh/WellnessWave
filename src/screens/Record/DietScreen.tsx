import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { RecordStackParamList } from "../../../types";
import RecordMealButton from "../../components/Record/Diet/RecordMealButton";
import { height, width } from "../../constants/Layout";
import MealHistory from "../../components/Record/Diet/MealHistory";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import { useEffect, useState } from "react";

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

const data = {
	Breakfast: ["Milk", "Pizza"],
	Lunch: ["Sandwich"],
	Dinner: [],
	Snack: [],
};

const DietScreen = ({ navigation }: Props) => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	const recordHandler = (type: string) => {
		navigation.navigate("DietRecord", {
			date: selectedDate.toISOString().slice(0, 10),
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
				<MealHistory type="Breakfast" data={data.Breakfast} />
				<MealHistory type="Lunch" data={data.Lunch} />
				<MealHistory type="Dinner" data={data.Dinner} />
				<MealHistory type="Snack" data={data.Snack} />
			</View>
		</SafeAreaView>
	);
};

export default DietScreen;
