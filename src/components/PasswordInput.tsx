import { TextInputProps, View, TouchableOpacity } from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "./AppTextInput";

interface PasswordInputProps extends TextInputProps {
	password: string;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	isPasswordVisible: boolean;
	setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	password,
	setPassword,
	isPasswordVisible,
	setIsPasswordVisible,
	...otherProps
}) => {
	return (
		<View style={{ position: "relative" }}>
			<AppTextInput
				secureTextEntry={!isPasswordVisible}
				value={password}
				onChangeText={(text) => setPassword(text)}
				{...otherProps}
			/>
			<TouchableOpacity
				onPress={() => setIsPasswordVisible(!isPasswordVisible)}
				style={{
					position: "absolute",
					right: Spacing * 2,
					top: Spacing * 3,
				}}
			>
				{isPasswordVisible ? (
					<Ionicons name="eye-outline" size={24} color="black" />
				) : (
					<Ionicons name="eye-off-outline" size={24} color="black" />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default PasswordInput;
