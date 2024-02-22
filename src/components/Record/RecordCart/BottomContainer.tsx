import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomContainerStyles as styles } from "./styles";

interface BottomContainerProps {
	iconComponent: React.ReactElement;
	title: string;
	count: number;
	cartController: () => void;
	buttonText: string;
	sendHandler: () => void;
}

const BottomContainer: React.FC<BottomContainerProps> = ({
	iconComponent,
	title,
	count,
	cartController,
	buttonText,
	sendHandler,
}) => {
	return (
		<View style={styles.bottomContainer}>
			<View style={styles.bottom}>
				<View>
					<TouchableOpacity onPress={cartController}>{iconComponent}</TouchableOpacity>
					{count > 0 && (
						<View style={styles.bottomCount}>
							<Text style={styles.bottomCountText}>{count}</Text>
						</View>
					)}
				</View>
				<Text style={styles.bottomTitle}>{title}</Text>
			</View>
			<TouchableOpacity style={styles.bottomButton} onPress={sendHandler}>
				<Text style={styles.bottomButtonText}>{buttonText}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BottomContainer;
