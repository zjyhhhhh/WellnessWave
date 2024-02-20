import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../types";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeNavigator from "./HomeNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "#fffff8",
	},
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationNavigator: React.FC = () => {
	const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const userToken = await AsyncStorage.getItem("userToken");
				setUserIsAuthenticated(!!userToken);
				// setUserIsAuthenticated(false);
			} catch (error) {
				console.error("Error checking authentication:", error);
			}
		};

		checkAuthentication();
	}, []);

	if (userIsAuthenticated === null) {
		return null;
	}

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{userIsAuthenticated ? (
					<Stack.Screen name="Home" component={HomeNavigator} />
				) : (
					<>
						<Stack.Screen name="Welcome" component={WelcomeScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
						<Stack.Screen name="Home" component={HomeNavigator} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthenticationNavigator;