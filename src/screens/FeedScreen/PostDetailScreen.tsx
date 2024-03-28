import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, SafeAreaView, TouchableOpacity, Image, Text, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { MomentStackParamList } from "../../../types";
import SingleCommentDisplay from "../../components/FeedScreenComponent/SingleCommentDisplay";
import PostDetailScreenBottomBar from "../../components/FeedScreenComponent/PostDetailScreenBottomBar";
import { useEffect } from "react";
import { height } from "../../constants/Layout";
import { PostDetailScreenStyle as StyleContainer } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<MomentStackParamList, "PostDetailScreen">;

const PostDetailScreen = ({ navigation, route }: Props) => {
	const isFocused = useIsFocused();
	const { data } = route.params;
	// const [commentCount, setCommentCount] = useState(1);
	const [comments, setComments] = useState([]);
	const [followed, setFollowed] = useState(data.followed);

	const followHandler = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		try {
			await fetch(`http://127.0.0.1:8000/follow_unfollow/${data.postAuthor}/${!followed}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${userToken}`,
				},
			});
			console.log(followed);
			setFollowed(!followed);
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: {
				display: "none",
			},
		});
		return () =>
			navigation.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					bottom: 0,
					right: 0,
					left: 0,
					elevation: 0,
					height: height * 0.1,
					backgroundColor: Colors.gray,
				},
			});
	}, [navigation]);
	const getUserInfo = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		const username = await AsyncStorage.getItem("username");
		return { userToken, username };
	};
	useEffect(() => {
		const fetchComments = async () => {
			const { userToken, username } = await getUserInfo();
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/get_comments/${data.postId}/${!followed}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `${userToken}`,
						},
					}
				);
				const jsonData = await response.json();
				setComments(jsonData);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};
		if (isFocused) {
			fetchComments();
		}
	}, [isFocused, data.postId]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<View style={StyleContainer.Headers}>
				<TouchableOpacity style={StyleContainer.backButton} onPress={navigation.goBack}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<Image
					source={{ uri: `data:image/jpeg;base64,${data.postPersonImage}` }}
					style={StyleContainer.portraitStyle}
				/>
				<Text style={StyleContainer.posterNameStyle}>{data.postAuthorName}</Text>
				{!followed ? (
					<TouchableOpacity style={StyleContainer.followButtonStyle} onPress={followHandler}>
						<Text style={StyleContainer.followButtonTextStyle}>Follow</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={StyleContainer.unfollowButtonStyle} onPress={followHandler}>
						<Text style={StyleContainer.unfollowButtonTextStyle}>Unfollow</Text>
					</TouchableOpacity>
				)}
			</View>
			<ScrollView style={{ backgroundColor: Colors.background }}>
				<View style={StyleContainer.imageStyle}>
					<Image
						source={{ uri: `data:image/jpeg;base64,${data.postImage}` }}
						style={{ width: "100%", height: 430 }}
					/>
				</View>
				<View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
					<Text style={{ fontSize: FontSize.small }}> {data.postText}</Text>
				</View>
				<Text style={StyleContainer.postDateStyle}> {data.postDate.slice(0, 10)}</Text>
				<View style={StyleContainer.separator}></View>
				{comments?.length > 0 ? (
					<View>
						<Text style={StyleContainer.commentCountStyle}> All {comments?.length} Comments</Text>
						{comments.map((comment: any, index) => (
							<SingleCommentDisplay
								username={comment.authorInfo.nickname}
								avatar={comment.authorInfo.avatar}
								text={comment.contentText}
								date={comment.postDate.slice(0, 10)}
								key={index}
							/>
						))}
					</View>
				) : null}
			</ScrollView>
			<PostDetailScreenBottomBar data={data} commentCount={comments.length} />
		</SafeAreaView>
	);
};

export default PostDetailScreen;
