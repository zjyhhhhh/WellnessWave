import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
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
import { createContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<ProfileStackParamList, "Main">;

type TopTabParamList = {
	MyPosts: undefined;
	Liked: undefined;
};

const Tab = createMaterialTopTabNavigator<TopTabParamList>();

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

interface PostData {
	postAuthor: string;
	postAuthorName: string;
	postPersonImage: string;
	postImage: any;
	postText: string;
	postDate: string;
	likes: number;
	isLiked: boolean;
	dislikes: number;
	isDisliked: boolean;
	postId: string;
	followed: boolean;
}

interface PostsContextType {
	posts: PostData[];
	likedPosts: PostData[];
}
export const PostsContext = createContext<PostsContextType>({ posts: [], likedPosts: [] });

const MainScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	const isFocused = useIsFocused();
	const [avatar, setAvatar] = useState<string>("");
	const [userNickname, setUserNickname] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [followers, setFollowers] = useState<number>(0);
	const [following, setFollowing] = useState<number>(0);
	const [posts, setPosts] = useState<PostData[]>([]);
	const [likedPosts, setLikedPosts] = useState<PostData[]>([]);

	useEffect(() => {
		const fetchProfile = async () => {
			const userToken = await AsyncStorage.getItem("userToken");
			const username = await AsyncStorage.getItem("username");
			const response = await fetch(`http://127.0.0.1:8000/get_profile`, {
				method: "GET",
				headers: {
					Authorization: `${userToken}`,
				},
			});
			const data = await response.json();

			const transformData = (data: any) => {
				return data.map((post: any) => {
					return {
						postId: post._id,
						postAuthor: post.author,
						postAuthorName: post.authorInfo.nickname,
						postPersonImage: post.authorInfo.avatar,
						postImage: post.postContent.contextImage[0],
						postText: post.postContent.contextText,
						postDate: post.postDate,
						likes: post.likes.length,
						isLiked: post.likes.includes(username) ? true : false,
						dislikes: post.dislikes.length,
						isDisliked: post.dislikes.includes(username) ? true : false,
						followed: post.followed,
					};
				});
			};

			const transfromedPosts = transformData(data.posts);
			const transformedLikedPosts = transformData(data.likedPosts);

			setFollowers(data.followers);
			setFollowing(data.following);
			setPosts(transfromedPosts);
			setLikedPosts(transformedLikedPosts);
		};
		if (isFocused) {
			fetchProfile();
		}
	}, [isFocused]);
	const value = useMemo(() => ({ posts, likedPosts }), [posts, likedPosts]);
	useEffect(() => {
		const getUser = async () => {
			const username = await AsyncStorage.getItem("username");
			const nickname = await AsyncStorage.getItem("nickname");
			const avatar = await AsyncStorage.getItem("avatarLocal");
			return { avatar, nickname, username };
		};
		const fetchUser = async () => {
			const user = await getUser();
			if (!user || !user.avatar || !user.nickname || !user.username) {
				return;
			}
			setAvatar(user.avatar);
			setUserNickname(user.nickname);
			setUserName(user.username);
		};
		fetchUser();
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
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
							{/* <Image source={{ uri: avatar }} style={styles.avatar} /> */}
							<Image source={{ uri: `data:image/jpeg;base64,${avatar}` }} style={styles.avatar} />
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
							<TouchableOpacity
								style={styles.connectContainer}
								onPress={() => navigate("FocusUsers")}
							>
								<Text style={styles.connectText}>Focus</Text>
								<Text style={styles.connectText}>{following}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.connectContainer}
								onPress={() => navigate("FansUsers")}
							>
								<Text style={styles.connectText}>Fans</Text>
								<Text style={styles.connectText}>{followers}</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.profileActionButtonsContainer}>
							<TouchableOpacity
								style={styles.profileEditButton}
								onPress={() => {
									navigate("Edit");
								}}
							>
								<Text style={styles.profileEditButtonText}>Edit Profile</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.profileSettingsButton}>
								<Ionicons name="settings-outline" size={24} color="#585757" />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{ flex: 1 }}>
						<PostsContext.Provider value={value}>
							<Tab.Navigator
								initialRouteName="MyPosts"
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
									name="MyPosts"
									component={MyPostsScreen}
									options={{ tabBarTestID: "my-posts-button" }}
								/>
								<Tab.Screen
									name="Liked"
									component={LikedPostsScreen}
									options={{ tabBarTestID: "liked-posts-button" }}
								/>
							</Tab.Navigator>
						</PostsContext.Provider>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MainScreen;
