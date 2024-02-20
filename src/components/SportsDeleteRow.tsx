import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { width } from "../constants/Layout";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import { AntDesign } from "@expo/vector-icons";
import IconComponent from "../constants/SportsIcons";

interface SportsDeleteRowProps {
	iconName: string;
	duration: number;
	editHandler: () => void;
	deleteHandler: () => void;
}

const styles = StyleSheet.create({
	itemRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: "3%",
		paddingHorizontal: "10%",
		width: "100%",
	},
	iconNameContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "60%",
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	itemName: {
		color: Colors.text,
		paddingLeft: 0.02 * width,
	},
	durationContainer: {
		borderWidth: 2,
		borderColor: Colors.gray,
		borderRadius: 15,
		paddingVertical: width * 0.01,
		paddingHorizontal: width * 0.04,
		marginLeft: width * 0.03,
	},
	textStyle: {
		fontFamily: Font["poppins-regular"],
		fontSize: FontSize.medium,
	},
});

const iconSize = width * 0.08;

const SportsDeleteRow = ({
	iconName,
	duration,
	editHandler,
	deleteHandler,
}: SportsDeleteRowProps) => {
	return (
		<View style={styles.itemRowContainer}>
			<View style={styles.itemRow}>
				<View style={styles.iconNameContainer}>
					<IconComponent activity={iconName} iconSize={iconSize} />
					<Text style={[styles.textStyle, styles.itemName]}>{iconName}</Text>
				</View>
				<TouchableOpacity style={styles.durationContainer} onPress={editHandler}>
					<Text style={styles.textStyle}>{duration} min</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={deleteHandler}>
				<AntDesign name="delete" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default SportsDeleteRow;
