import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PostDetailScreenBottomBarStyles as styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThumbsButton from "../ThumbsButton";
import { AllFeedScreenStyle } from "../../screens/FeedScreen/styles";
import Colors from "../../constants/Colors";

interface PostData {
	postAuthor: string;
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

interface PostDetailScreenBottomBarProps {
	data: PostData;
	commentCount: number;
}

const PostDetailScreenBottomBar = ({ data, commentCount }: PostDetailScreenBottomBarProps) => {
	const [like, setLike] = useState(data.isLiked);
	const [dislike, setDislike] = useState(data.isDisliked);
	const [likes, setLikes] = useState(data.likes); // number of likes
	const [dislikes, setDislikes] = useState(data.dislikes); // number of dislikes

	const [input, setInput] = useState<string>("");

	return (
		<View style={styles.bottomContainer}>
			<TextInput
				style={styles.input}
				placeholder="Say Something..."
				placeholderTextColor="grey"
				value={input}
				onChangeText={setInput}
				onSubmitEditing={async () => {
					const userToken = await AsyncStorage.getItem("userToken");
					const username = await AsyncStorage.getItem("username");
					const nickname = await AsyncStorage.getItem("nickname");
					const avatar = await AsyncStorage.getItem("avatar");
					if (input !== "") {
						try {
							const response = await fetch(`http://127.0.0.1:8000/add_comment/${data.postId}`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Authorization: `${userToken}`,
								},
								body: JSON.stringify({
									contentText: input,
									author: username,
									authorInfo: {
										username: username,
										nickname: nickname,
										avatar: avatar,
									},
								}),
							});
							if (response.ok) {
								setInput("");
							}
						} catch (error) {
							
							/* istanbul ignore next */ console.error("Network error:", error);
						}
					}
				}}
			/>
			{/* <TouchableOpacity style={styles.iconButton}>
				<AntDesign name="like2" size={24} color="black" />
				<Text style={styles.numbers}>72</Text>
			</TouchableOpacity> */}
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				{/* Code for handling Thumbs Up button */}
				<ThumbsButton
					postId={data.postId}
					like={like}
					setLike={setLike}
					dislike={dislike}
					setDislike={setDislike}
					likeCount={likes}
					setLikeCount={setLikes}
					dislikeCount={dislikes}
					setDislikeCount={setDislikes}
					icon={
						<AntDesign
							name= {like ? /* istanbul ignore next */ "like1" : "like2"}
							size={24}
							color="black"
							style={{
								paddingRight: 10,
								color: like ? /* istanbul ignore next */ Colors.primary : "black",
							}}
						/>
					}
					testID={`testThumbUpButton`}
					action={"like"}
				/>
				<Text style={AllFeedScreenStyle.likeDislikeNumbers}>{likes}</Text>
				{/* Code for handling Thumbs Down button */}
				<ThumbsButton
					postId={data.postId}
					like={like}
					setLike={setLike}
					dislike={dislike}
					setDislike={setDislike}
					likeCount={likes}
					setLikeCount={setLikes}
					dislikeCount={dislikes}
					setDislikeCount={setDislikes}
					icon={
						<AntDesign
							
							name={dislike ? /* istanbul ignore next */ "dislike1" : "dislike2"}
							size={24}
							color="black"
							style={{
								paddingRight: 10,
				
								color: dislike ? /* istanbul ignore next */ "red" : "black",
							}}
						/>
					}
					testID={`testThumbDownButton`}
					action={"dislike"}
				/>
				<Text style={AllFeedScreenStyle.likeDislikeNumbers}>{dislikes}</Text>
				{/* Code for handling Comment  button */}
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<MaterialCommunityIcons
						name="comment-outline"
						size={24}
						color="black"
						style={{
							paddingRight: 10,
						}}
					/>
					<Text style={AllFeedScreenStyle.likeDislikeNumbers}>{commentCount}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default PostDetailScreenBottomBar;
