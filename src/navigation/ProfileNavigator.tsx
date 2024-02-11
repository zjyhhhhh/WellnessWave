import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../types";
import MainScreen from "../screens/Profile/MainScreen";
import EditScreen from "../screens/Profile/EditScreen";
import SettingScreen from "../screens/Profile/SettingScreen";
import NotificationScreen from "../screens/Profile/NotificationScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator = ({}) => {
	return (
		<Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Main" component={MainScreen} />
			<Stack.Screen name="Edit" component={EditScreen} />
			<Stack.Screen name="Setting" component={SettingScreen} />
			<Stack.Screen name="Notification" component={NotificationScreen} />
		</Stack.Navigator>
	);
};

export default ProfileNavigator;
