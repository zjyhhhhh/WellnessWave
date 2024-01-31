import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../components/AppTextInput";
import PasswordInput from "../components/PasswordInput";
import {
	emailVerifier,
	usernameVerifier,
	passwordVerifier,
	confirmPasswordVerifier,
} from "../utils/formatVerifier";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isComfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

	const registerHandler = () => {
		if (
			emailVerifier(email) &&
			usernameVerifier(username) &&
			passwordVerifier(password) &&
			confirmPasswordVerifier(password, confirmPassword)
		) {
			console.log("email: ", email);
			console.log("username: ", username);
			console.log("password: ", password);
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
					padding: Spacing * 2,
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
						Create account
					</Text>
					<Text
						style={{
							fontFamily: Font["poppins-regular"],
							fontSize: FontSize.small,
							maxWidth: "80%",
							textAlign: "center",
						}}
					>
						Register today and step into a healthier tomorrow with WellnessWave!
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
					<AppTextInput
						placeholder="Username"
						value={username}
						onChangeText={(text) => setUsername(text)}
					/>
					<PasswordInput
						password={password}
						setPassword={setPassword}
						isPasswordVisible={isPasswordVisible}
						setIsPasswordVisible={setIsPasswordVisible}
						placeholder="Password"
					/>
					<PasswordInput
						password={confirmPassword}
						setPassword={setConfirmPassword}
						isPasswordVisible={isComfirmPasswordVisible}
						setIsPasswordVisible={setIsConfirmPasswordVisible}
						placeholder="Confirm password"
					/>
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
				>
					<Text
						style={{
							fontFamily: Font["poppins-bold"],
							color: Colors.onPrimary,
							textAlign: "center",
							fontSize: FontSize.large,
						}}
						onPress={registerHandler}
					>
						Sign up
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigate("Login")}
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
						Already have an account
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

export default RegisterScreen;
