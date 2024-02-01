import { View, Text, SafeAreaView } from "react-native";
import { MomentStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<MomentStackParamList, "Search">;
const SearchScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView>
			<View>
				<Text>Search Screen</Text>
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;
