import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MomentNavigator from "./MomentNavigator";
import { Ionicons } from "@expo/vector-icons";
import { height } from "../constants/Layout";
import Colors from "../constants/Colors";
import BottomTabBarIcon from "../components/BottomTabBarIcon";
import { useEffect, useState } from "react";
import ProfileNavigator from "./ProfileNavigator";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RecordNavigator from "./RecordNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeNavigator: React.FC<Props> = ({ navigation: { navigate } }) => {
	const [hasNotification, setHasNotification] = useState<boolean>(false);
	const getTabBarVisibility = (route: any) => {
		const routeName = getFocusedRouteNameFromRoute(route);
		const hideOnScreens = ["DietRecord"]; // put here name of screen where you want to hide tabBar
		if (routeName === undefined) return true;
		return hideOnScreens.indexOf(routeName) <= -1;
	};

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
				component={RecordNavigator}
				options={({ route }) => ({
					tabBarVisible: getTabBarVisibility(route),
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
				})}
				listeners={({ navigation, route }) => ({
					tabPress: (e) => {
						e.preventDefault();
						navigation.navigate("Record", {
							screen: "History",
						});
					},
				})}
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
