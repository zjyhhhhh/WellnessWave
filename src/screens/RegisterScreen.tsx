import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView>
			<View>
				<Text>Register Screen</Text>
			</View>
		</SafeAreaView>
	);
};

export default RegisterScreen;
