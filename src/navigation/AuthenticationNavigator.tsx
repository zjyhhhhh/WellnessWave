import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { RootStackParamList } from "../../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthenticationNavigator: React.FC = () => {
	const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const userToken = await AsyncStorage.getItem("userToken");
				setUserIsAuthenticated(!!userToken);
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
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				{userIsAuthenticated ? (
					<Stack.Screen name="Home" component={HomeScreen} />
				) : (
					<>
						<Stack.Screen name="Welcome" component={WelcomeScreen} />
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AuthenticationNavigator;
