import { View, Text, SafeAreaView } from "react-native";
import { MomentStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<MomentStackParamList, "Notification">;
const NotificationScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView>
			<View>
				<Text>Notification Screen</Text>
			</View>
		</SafeAreaView>
	);
};

export default NotificationScreen;
