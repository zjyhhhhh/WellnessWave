import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RecordStackParamList } from "../../../types";

type Props = NativeStackScreenProps<RecordStackParamList, "Diet">;

const DietScreen = ({ navigation: { navigate } }: Props) => {
	return (
		<View>
			<Text>Diet Screen</Text>
		</View>
	);
};

export default DietScreen;
