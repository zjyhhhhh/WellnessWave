import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { height, width } from "../constants/Layout";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const styles = (activate: boolean) =>
	StyleSheet.create({
		typeContainer: {
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "center",
			marginLeft: 0.05 * width,
			marginBottom: 0.01 * height,
			backgroundColor: activate ? "white" : undefined,
			padding: 0.02 * width,
			borderTopLeftRadius: 0.06 * width,
			borderBottomLeftRadius: 0.06 * width,
		},
		typeText: {
			fontSize: FontSize.medium,
			fontFamily: Font["poppins-semiBold"],
			color: activate ? Colors.primary : Colors.darkGray,
		},
	});

const SidebarCategoryPicker = ({
	category,
	currentCategory,
	setCategory,
}: {
	category: string;
	currentCategory: string;
	setCategory: (category: string) => void;
}) => {
	const handleCategoryChange = () => {
		setCategory(category);
	};
	return (
		<TouchableWithoutFeedback onPress={handleCategoryChange}>
			<View style={styles(category == currentCategory).typeContainer}>
				<Text style={styles(category == currentCategory).typeText}>{category}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SidebarCategoryPicker;
