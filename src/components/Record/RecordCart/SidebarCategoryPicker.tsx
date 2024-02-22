import { View, Text, TouchableWithoutFeedback } from "react-native";
import { SidebarCategoryPickerstyles as styles } from "./styles";

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
