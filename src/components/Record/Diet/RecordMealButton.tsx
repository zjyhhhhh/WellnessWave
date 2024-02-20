import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { height, width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import Breakfast from "../../../assets/icons/Breakfast.svg";
import Lunch from "../../../assets/icons/Lunch.svg";
import Dinner from "../../../assets/icons/Dinner.svg";
import Snack from "../../../assets/icons/Snack.svg";

interface RecordMealButtonProps {
	type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
	pressHandler?: () => void;
}

const icons = {
	Breakfast: Breakfast,
	Lunch: Lunch,
	Dinner: Dinner,
	Snack: Snack,
};

const iconSize = width * 0.15;

const RecordMealButton = ({ type, pressHandler }: RecordMealButtonProps) => {
	const IconComponent = icons[type];
	const styles = StyleSheet.create({
		recordButtonContainer: {
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		recordButtonText: {
			fontSize: FontSize.small,
			paddingTop: 0.015 * width,
			color: Colors.text,
			fontFamily: Font["poppins-bold"],
		},
	});
	return (
		<>
			<TouchableOpacity style={styles.recordButtonContainer} onPress={pressHandler}>
				<IconComponent width={iconSize} height={iconSize} />
				<Text style={styles.recordButtonText}>{type}</Text>
			</TouchableOpacity>
		</>
	);
};

export default RecordMealButton;
