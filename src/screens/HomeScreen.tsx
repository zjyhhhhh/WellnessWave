import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView>
			<View>
				<Text>Home Screen</Text>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
