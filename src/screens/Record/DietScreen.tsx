import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { RecordStackParamList } from "../../../types";
import RecordMealButton from "../../components/RecordMealButton";
import { height, width } from "../../constants/Layout";
import MealHistory from "../../components/MealHistory";

type Props = NativeStackScreenProps<RecordStackParamList, "Diet">;

const styles = StyleSheet.create({
	newRecordContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 0.04 * height,
		marginBottom: 0.03 * height,
		marginHorizontal: 0.05 * width,
	},
});

const data = {
	Breakfast: [
		{
			iconName: "Milk",
			text: "Milk",
		},
		{
			iconName: "Sandwich",
			text: "Sandwich",
		},
	],
	Lunch: [
		{
			iconName: "Pizza",
			text: "Pizza",
		},
		{
			iconName: "Coca-Cola",
			text: "Coca-Cola",
		},
	],
	Dinner: [],
	Snack: [],
};

const DietScreen = ({ navigation: { navigate } }: Props) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.newRecordContainer}>
				<RecordMealButton type="Breakfast" />
				<RecordMealButton type="Lunch" />
				<RecordMealButton type="Dinner" />
				<RecordMealButton type="Snack" />
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
