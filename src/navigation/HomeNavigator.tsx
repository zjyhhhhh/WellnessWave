import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MomentNavigator from "./MomentNavigator";
import RecordScreen from "../screens/RecordScreen";
import { Ionicons } from "@expo/vector-icons";
import { height } from "../constants/Layout";
import Colors from "../constants/Colors";
import BottomTabBarIcon from "../components/BottomTabBarIcon";
import { useEffect, useState } from "react";
import ProfileNavigator from "./ProfileNavigator";
const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
	const [hasNotification, setHasNotification] = useState<boolean>(false);

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
				component={MomentNavigator}
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
							hasNotification={false}
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
							hasNotification={false}
						/>
					),
					tabBarTestID: "record-tab",
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileNavigator}
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
							hasNotification={hasNotification}
						/>
					),
					tabBarTestID: "profile-tab",
				}}
			/>
		</Tab.Navigator>
	);
};

export default HomeNavigator;
