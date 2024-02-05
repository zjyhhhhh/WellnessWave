import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { height, width } from "../../constants/Layout";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../types";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPostsScreen from "./MyPostsScreen";
import LikedPostsScreen from "./LikedPostsScreen";

type Props = NativeStackScreenProps<ProfileStackParamList, "Main">;

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.secondary,
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	notificationContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingHorizontal: 0.04 * width,
		marginTop: height * 0.01,
	},
	userContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 0.01 * height,
		paddingHorizontal: 0.04 * width,
	},
	avatarContainer: {
		marginRight: 0.05 * width,
	},
	avatar: {
		width: 0.24 * width,
		height: 0.24 * width,
		borderRadius: 0.12 * width,
	},
	userInfoContainer: {
		flex: 1,
		marginVertical: 0.012 * height,
	},
	userNicknameContainer: {
		marginBottom: 0.01 * height,
	},
	userNickname: {
		fontSize: FontSize.xLarge,
		fontFamily: Font["poppins-semiBold"],
		color: Colors.darkGray,
	},
	userName: {
		fontSize: FontSize.medium,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
	},
	introductionContainer: {
		marginVertical: 0.02 * height,
		paddingHorizontal: 0.04 * width,
	},
	introduction: {
		fontSize: FontSize.medium,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
	},
	connectContainer: {
		flexDirection: "column",
		alignItems: "center",
	},
	connectText: {
		fontSize: FontSize.medium,
		color: Colors.darkGray,
		fontFamily: Font["poppins-regular"],
		paddingHorizontal: 0.02 * width,
	},
	profileActionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 0.01 * height,
		marginBottom: 0.02 * height,
		paddingHorizontal: 0.04 * width,
	},
	userStatsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	profileActionButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 0.04 * width,
	},
	profileEditButton: {
		paddingHorizontal: 20,
		borderRadius: 30,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 0.02 * width,
	},
	profileEditButtonText: {
		fontFamily: Font["poppins-regular"],
		color: Colors.darkGray,
		fontSize: FontSize.medium,
		textAlign: "center",
	},
	profileSettingsButton: {
		paddingHorizontal: 20,
		borderRadius: 30,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},
});

const avatarPath = require("../../assets/images/avatar.jpg");
const userNickname = "Yahh";
const userName = "123456abc";

const MainScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.notificationContainer}>
					<Ionicons
						name="notifications-outline"
						size={28}
						color="black"
						testID="notification-button"
						onPress={() => {
							navigate("Notification");
						}}
					/>
				</View>
				<View style={styles.userContainer}>
					<View style={styles.avatarContainer}>
						<Image source={avatarPath} style={styles.avatar} />
					</View>
					<View style={styles.userInfoContainer}>
						<View style={styles.userNicknameContainer}>
							<Text style={styles.userNickname}>{userNickname}</Text>
						</View>
						<Text style={styles.userName}>Username: {userName}</Text>
					</View>
				</View>

				<View style={styles.introductionContainer}>
					<Text style={styles.introduction}>Click Here! Introduce yourself</Text>
				</View>

				<View style={styles.profileActionsContainer}>
					<View style={styles.userStatsContainer}>
						<View style={styles.connectContainer}>
							<Text style={styles.connectText}>Focus</Text>
							<Text style={styles.connectText}>0</Text>
						</View>
						<View style={styles.connectContainer}>
							<Text style={styles.connectText}>Fans</Text>
							<Text style={styles.connectText}>0</Text>
						</View>
					</View>
					<View style={styles.profileActionButtonsContainer}>
						<TouchableOpacity style={styles.profileEditButton}>
							<Text style={styles.profileEditButtonText}>Edit Profile</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileSettingsButton}>
							<Ionicons name="settings-outline" size={24} color="#585757" />
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={{
						flex: 1,
					}}
				>
					<Tab.Navigator
						initialRouteName="My Posts"
						screenOptions={{
							tabBarActiveTintColor: Colors.text,
							tabBarLabelStyle: {
								fontSize: FontSize.medium,
								fontFamily: Font["poppins-semiBold"],
								fontStyle: "normal",
								textTransform: "none",
							},
							tabBarStyle: {
								backgroundColor: Colors.gray,
								borderTopLeftRadius: 35,
								borderTopRightRadius: 35,
								paddingVertical: 0.004 * height,
							},
							tabBarIndicatorStyle: { backgroundColor: Colors.primary },
						}}
					>
						<Tab.Screen
							name="My Posts"
							component={MyPostsScreen}
							options={{ tabBarTestID: "my-posts-button" }}
						/>
						<Tab.Screen
							name="Liked"
							component={LikedPostsScreen}
							options={{ tabBarTestID: "liked-posts-button" }}
						/>
					</Tab.Navigator>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default MainScreen;
