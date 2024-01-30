import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MomentScreen from "../screens/MomentScreen";
import RecordScreen from "../screens/RecordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { height } from "../constants/Layout";
import Colors from "../constants/Colors";
import BottomTabBarIcon from "../components/BottomTabBarIcon";
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					position: "absolute",
					bottom: 0,
					right: 0,
					left: 0,
					elevation: 0,
					height: height * 0.1,
					backgroundColor: Colors.gray,
				},
			}}
		>
			<Tab.Screen
				name="Moment"
				component={MomentScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<BottomTabBarIcon
							focused={focused}
							icon={
								<Ionicons
									name="home-outline"
									size={height * 0.04}
									color={focused ? Colors.primary : Colors.text}
								/>
							}
						/>
					),
					tabBarTestID: "moment-tab",
				}}
			/>
			<Tab.Screen
				name="Record"
				component={RecordScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<BottomTabBarIcon
							focused={focused}
							icon={
								<Ionicons
									name="trophy-outline"
									size={height * 0.04}
									color={focused ? Colors.primary : Colors.text}
								/>
							}
						/>
					),
					tabBarTestID: "record-tab",
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<BottomTabBarIcon
							focused={focused}
							icon={
								<Ionicons
									name="person-outline"
									size={height * 0.04}
									color={focused ? Colors.primary : Colors.text}
								/>
							}
						/>
					),
					tabBarTestID: "profile-tab",
				}}
			/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;
