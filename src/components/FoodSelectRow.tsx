import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { width } from "../constants/Layout";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { MaterialIcons } from "@expo/vector-icons";
import { foodIcons } from "../constants/FoodIcons";

interface FoodSelectRowProps {
	iconName: string;
	selected: boolean;
	addHandler: () => void;
}

const styles = StyleSheet.create({
	foodRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "10%",
		paddingVertical: "3%",
		borderBottomColor: Colors.gray,
		borderBottomWidth: 2,
		width: "100%",
	},
	foodRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 0.008 * width,
	},
	foodName: {
		fontSize: FontSize.medium,
		color: Colors.text,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.02 * width,
	},
});

const iconSize = width * 0.08;

const FoodSelectRow = ({ iconName, selected, addHandler }: FoodSelectRowProps) => {
	const IconComponent = foodIcons[iconName];
	return (
		<View style={styles.foodRowContainer}>
			<View style={styles.foodRow}>
				<IconComponent height={iconSize} width={iconSize} />
				<Text style={styles.foodName}>{iconName}</Text>
			</View>
			<TouchableOpacity onPress={addHandler}>
				<MaterialIcons
					name="add-circle-outline"
					size={26}
					color={selected ? Colors.gray : Colors.primary}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default FoodSelectRow;
