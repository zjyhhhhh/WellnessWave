import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { selectRowStyles as styles } from "./styles";

interface SelectRowProps {
	iconName: string;
	selected: boolean;
	addHandler: () => void;
	IconComponent: React.ElementType;
}

const iconSize = width * 0.08;

const SelectRow: React.FC<SelectRowProps> = ({ iconName, selected, addHandler, IconComponent }) => {
	return (
		<View style={styles.foodRowContainer}>
			<View style={styles.foodRow}>
				<IconComponent activity={iconName} iconSize={iconSize} />
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

export default SelectRow;
