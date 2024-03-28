import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import PostImageButton from "../../components/FeedScreenComponent/PostImageButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MomentStackParamList, RootStackParamList } from "../../../types";
import { AllFeedScreenStyle } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostCard from "../../components/FeedScreenComponent/PostCard";
import { useIsFocused } from "@react-navigation/native";

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

const AllFeedScreen = ({}) => {
	const isFocused = useIsFocused();
	const [postData, setPostData] = useState<PostData[]>([]);
	const navigation = useNavigation<NativeStackNavigationProp<MomentStackParamList>>();

	const getUserInfo = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		const username = await AsyncStorage.getItem("username");
		return { userToken, username };
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const { userToken, username } = await getUserInfo();
			try {
				const response = await fetch(`http://127.0.0.1:8000/get_posts/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${userToken}`,
					},
				});
				if (!response.ok) {
					console.error("Server responded with status", response.status);
					return;
				}
				const jsonData = await response.json();
				const data = jsonData.posts.map((post: any) => {
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
				setPostData(data);
			} catch (error) {
				console.error("Network error:", error);
			}
		};
		if (isFocused) {
			fetchPosts();
			console.log("fetching posts");
		}
	}, [isFocused]);
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				style={AllFeedScreenStyle.container}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
			>
				<SafeAreaView>
					{postData?.map((item, index) => (
						<PostCard data={item} navigation={navigation} key={item.postId} />
					))}
				</SafeAreaView>
			</ScrollView>
			<PostImageButton />
		</View>
	);
};

export default AllFeedScreen;
