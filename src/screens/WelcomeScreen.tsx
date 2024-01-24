import React from "react";
import { View, Text, SafeAreaView, ImageBackground, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
// import Font from "../constants/Font";
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
							paddingTop: Spacing * 4,
						}}
					>
						<Text
							style={{
								fontSize: FontSize.xxLarge,
								color: Colors.primary,
								// fontFamily: Font["poppins-bold"],
								textAlign: "center",
							}}
						>
							WellnessWave
						</Text>
						<Text
							style={{
								fontSize: FontSize.large,
								color: Colors.primary,
								// fontFamily: Font["poppins-bold"],
								textAlign: "center",
							}}
						>
							Sculpt Your Body, Nourish Your Soul
						</Text>
						<Text
							style={{
								fontSize: FontSize.medium,
								color: Colors.text,
								// fontFamily: Font["poppins-regular"],
								textAlign: "center",
							}}
						>
							Ride the WellnessWave for Personalized Fitness and Nutrition Excellence!
						</Text>
					</View>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeScreen;
