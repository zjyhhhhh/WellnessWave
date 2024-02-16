import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { width } from "../constants/Layout";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { AntDesign } from "@expo/vector-icons";
import { foodIcons } from "../constants/FoodIcons";

interface FoodDeleteRowProps {
	iconName: string;
	deleteHandler: () => void;
}

const styles = StyleSheet.create({
	foodRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: "3%",
		paddingHorizontal: "10%",
		width: "100%",
	},
	foodRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	foodName: {
		fontSize: FontSize.medium,
		color: Colors.text,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.02 * width,
	},
});

const iconSize = width * 0.08;

const FoodDeleteRow = ({ iconName, deleteHandler }: FoodDeleteRowProps) => {
	const IconComponent = foodIcons[iconName];
	return (
		<View style={styles.foodRowContainer}>
			<View style={styles.foodRow}>
				<IconComponent height={iconSize} width={iconSize} />
				<Text style={styles.foodName}>{iconName}</Text>
			</View>
			<TouchableOpacity onPress={deleteHandler}>
				<AntDesign name="delete" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default FoodDeleteRow;
