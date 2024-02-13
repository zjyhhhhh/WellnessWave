import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { height, width } from "../constants/Layout";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Dish from "../assets/icons/Dish.svg";
import Dumbbell from "../assets/icons/Dumbbell.svg";
import HeartBeat from "../assets/icons/HeartBeat.svg";

interface RecordButtonProps {
	type: "Diet" | "Sports" | "Health";
	pressHandler?: () => void;
}

const RecordButton = ({ type, pressHandler }: RecordButtonProps) => {
	const styles = StyleSheet.create({
		recordButtonContainer: {
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		recordButtonIcon: {
			backgroundColor: Colors.primary,
			width: 0.2 * width,
			height: 0.2 * width,
			borderRadius: 0.1 * width,
			marginHorizontal: 0.05 * width,
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			...(type === "Diet" ? { paddingBottom: 0.06 * width } : {}),
		},
		recordButtonText: {
			fontSize: FontSize.large,
			paddingTop: 0.015 * width,
			color: Colors.primary,
			fontFamily: Font["poppins-bold"],
		},
	});
	return (
		<>
			<TouchableOpacity style={styles.recordButtonContainer} onPress={pressHandler}>
				<View style={styles.recordButtonIcon}>
					{type === "Diet" && <Dish />}
					{type === "Sports" && <Dumbbell />}
					{type === "Health" && <HeartBeat />}
				</View>
				<Text style={styles.recordButtonText}>{type}</Text>
			</TouchableOpacity>
		</>
	);
};

export default RecordButton;
