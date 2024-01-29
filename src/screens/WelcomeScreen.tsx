import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	ImageBackground,
	Dimensions,
	Image,
	TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView>
			<View>
				<ImageBackground
					style={{
						height: height * 0.94,
						width: "100%",
					}}
					resizeMode="cover"
					source={require("../assets/images/welcome-img.jpeg")}
				>
					<View
						style={{
							paddingHorizontal: Spacing * 4,
							paddingVertical: height * 0.15,
						}}
					>
						<Image
							source={require("../assets/images/logo.png")}
							style={{ width: 350, height: 220, alignSelf: "center" }}
						/>
						<Text
							style={{
								fontSize: FontSize.xxLarge,
								color: Colors.primary,
								fontFamily: Font["poppins-bold"],
								textAlign: "center",
							}}
						>
							Shape Up, Eat Right
						</Text>
						{/* <Text
							style={{
								fontSize: FontSize.medium,
								color: Colors.text,
								// fontFamily: Font["poppins-regular"],
								textAlign: "center",
							}}
						>
							Ride the WellnessWave for Personalized Fitness and Nutrition Excellence!
						</Text> */}
					</View>

					<View
						style={{
							paddingHorizontal: Spacing * 2,
							paddingTop: Spacing * 18,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<TouchableOpacity
							onPress={() => navigate("Login")}
							style={{
								backgroundColor: Colors.primary,
								paddingVertical: Spacing * 1.5,
								paddingHorizontal: Spacing * 2,
								width: "48%",
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
									fontSize: FontSize.large,
									textAlign: "center",
								}}
							>
								Login
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigate("Register")}
							style={{
								backgroundColor: Colors.onPrimary,
								paddingVertical: Spacing * 1.5,
								paddingHorizontal: Spacing * 2,
								width: "48%",
								borderRadius: Spacing,
							}}
						>
							<Text
								style={{
									fontFamily: Font["poppins-bold"],
									color: Colors.text,
									fontSize: FontSize.large,
									textAlign: "center",
								}}
							>
								Register
							</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeScreen;
