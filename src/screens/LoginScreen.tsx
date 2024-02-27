import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../components/Welcome/AppTextInput";
import PasswordInput from "../components/Welcome/PasswordInput";
import { emailVerifier, passwordVerifier } from "../utils/formatVerifier";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const loginHandler = async () => {
		if (emailVerifier(email) && passwordVerifier(password)) {
			const response = await fetch(`http:127.0.0.1:8000/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			console.log(response);
			if (response.ok) {
				const data = await response.json();

				AsyncStorage.setItem("userToken", data.access_token);
				AsyncStorage.setItem("tokenType", data.token_type);
				AsyncStorage.setItem("username", data.username);

				navigate("Home");
			} else {
				console.log("error");
			}
		}
	};

	const googleLoginHandler = () => {
		console.log("google login");
	};

	const githubLoginHandler = () => {
		console.log("github login");
	};
	return (
		<SafeAreaView>
			<View
				style={{
					padding: Spacing * 4,
				}}
			>
				<View
					style={{
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: FontSize.xLarge,
							color: Colors.primary,
							fontFamily: Font["poppins-bold"],
							marginVertical: Spacing * 3,
						}}
					>
						Login here
					</Text>
					<Text
						style={{
							fontFamily: Font["poppins-semiBold"],
							fontSize: FontSize.medium,
							maxWidth: "80%",
							textAlign: "center",
						}}
					>
						Welcome back to WellnessWave!{"\n"}Ready to elevate your fitness journey?
					</Text>
				</View>
				<View
					style={{
						marginVertical: Spacing * 3,
					}}
				>
					<AppTextInput
						placeholder="Email"
						value={email}
						textContentType="emailAddress"
						inputMode="email"
						onChangeText={(text) => setEmail(text)}
					/>
					<PasswordInput
						password={password}
						setPassword={setPassword}
						isPasswordVisible={isPasswordVisible}
						setIsPasswordVisible={setIsPasswordVisible}
						placeholder="Password"
					/>
				</View>

				<View>
					<Text
						style={{
							fontFamily: Font["poppins-semiBold"],
							fontSize: FontSize.small,
							color: Colors.primary,
							alignSelf: "flex-end",
						}}
					>
						Forgot your password ?
					</Text>
				</View>

				<TouchableOpacity
					style={{
						padding: Spacing * 2,
						backgroundColor: Colors.primary,
						marginVertical: Spacing * 3,
						borderRadius: Spacing,
						shadowColor: Colors.primary,
						shadowOffset: {
							width: 0,
							height: Spacing,
						},
						shadowOpacity: 0.3,
						shadowRadius: Spacing,
					}}
					onPress={loginHandler}
				>
					<Text
						style={{
							fontFamily: Font["poppins-bold"],
							color: Colors.onPrimary,
							textAlign: "center",
							fontSize: FontSize.large,
						}}
					>
						Sign in
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigate("Register")}
					style={{
						padding: Spacing,
					}}
				>
					<Text
						style={{
							fontFamily: Font["poppins-semiBold"],
							color: Colors.text,
							textAlign: "center",
							fontSize: FontSize.small,
						}}
					>
						Create new account
					</Text>
				</TouchableOpacity>

				<View
					style={{
						marginVertical: Spacing * 3,
					}}
				>
					<Text
						style={{
							fontFamily: Font["poppins-semiBold"],
							color: Colors.primary,
							textAlign: "center",
							fontSize: FontSize.small,
						}}
					>
						Or continue with
					</Text>

					<View
						style={{
							marginTop: Spacing,
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<TouchableOpacity
							style={{
								padding: Spacing,
								backgroundColor: Colors.gray,
								borderRadius: Spacing / 2,
								marginHorizontal: Spacing,
							}}
							onPress={googleLoginHandler}
							testID="google-login"
						>
							<Ionicons name="logo-google" color={Colors.text} size={Spacing * 2} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								padding: Spacing,
								backgroundColor: Colors.gray,
								borderRadius: Spacing / 2,
								marginHorizontal: Spacing,
							}}
							onPress={githubLoginHandler}
							testID="github-login"
						>
							<Ionicons name="logo-github" color={Colors.text} size={Spacing * 2} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoginScreen;
