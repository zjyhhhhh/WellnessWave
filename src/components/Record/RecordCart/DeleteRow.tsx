import { TouchableOpacity, View, Text } from "react-native";
import { width } from "../../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";
import { deleteRowStyles as styles } from "./styles";

interface DeleteRowProps {
	iconName: string;
	IconComponent: React.ElementType;
	deleteHandler: () => void;
	editHandler?: () => void;
	duration?: number;
}

const iconSize = width * 0.08;

const DeleteRow: React.FC<DeleteRowProps> = ({
	iconName,
	IconComponent,
	deleteHandler,
	editHandler,
	duration,
}) => {
	return (
		<View style={styles.itemRowContainer}>
			<View style={styles.itemRow}>
				<View style={styles.iconNameContainer}>
					<IconComponent activity={iconName} iconSize={iconSize} />
					<Text style={[styles.textStyle, styles.itemName]}>{iconName}</Text>
				</View>
				{duration !== undefined && editHandler && (
					<TouchableOpacity style={styles.durationContainer} onPress={editHandler}>
						<Text style={styles.textStyle}>{duration} min</Text>
					</TouchableOpacity>
				)}
			</View>
			<TouchableOpacity onPress={deleteHandler}>
				<AntDesign name="delete" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default DeleteRow;
