import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { MomentStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AllFeedScreen from "./FeedScreen/AllFeedScreen";

type Props = NativeStackScreenProps<MomentStackParamList, "Feed">;
const Tab = createMaterialTopTabNavigator();

const FocusFeedScreen = ({}) => {
	return (
		<SafeAreaView>
			<View>
				<Text>Focus Screen</Text>
			</View>
		</SafeAreaView>
	);
};

const FeedScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<Tab.Navigator
			initialRouteName="All"
			screenOptions={{
				tabBarActiveTintColor: Colors.text,
				tabBarLabelStyle: { fontSize: FontSize.medium, fontFamily: Font["poppins-semiBold"] },
				tabBarStyle: { backgroundColor: Colors.background },
				tabBarIndicatorStyle: { backgroundColor: Colors.primary },
			}}
			style={{
				marginTop: Constants.statusBarHeight,
			}}
		>
			<Tab.Screen name="All" component={AllFeedScreen} options={{ tabBarTestID: "all-feed-tab" }} />
			<Tab.Screen
				name="Focus"
				component={FocusFeedScreen}
				options={{ tabBarTestID: "focus-feed-tab" }}
			/>
		</Tab.Navigator>
	);
};

export default FeedScreen;
