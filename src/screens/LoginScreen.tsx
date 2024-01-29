import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../components/AppTextInput";
import { showMessage, hideMessage } from "react-native-flash-message";
import PasswordInput from "../components/PasswordInput";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const formatVerifier = () => {
		const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
		if (!strongRegex.test(email)) {
			showMessage({ message: "Please enter a valid email address", type: "danger" });
			return false;
		} else if (password.length < 8) {
			showMessage({ message: "Password must be at least 8 characters", type: "danger" });
			return false;
		}
	};

	const loginHandler = () => {
		formatVerifier();
		// TODO: send email and password to backend
		console.log("email: ", email);
		console.log("password: ", password);
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
