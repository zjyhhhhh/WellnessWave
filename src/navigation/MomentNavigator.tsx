import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MomentStackParamList } from "../../types";
import NotificationScreen from "../screens/NotificationScreen";
import FeedScreen from "../screens/FeedScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator<MomentStackParamList>();

const MomentNavigator = ({}) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Feed" component={FeedScreen} />
			<Stack.Screen name="Notification" component={NotificationScreen} />
			<Stack.Screen name="Search" component={SearchScreen} />
		</Stack.Navigator>
	);
};

export default MomentNavigator;
