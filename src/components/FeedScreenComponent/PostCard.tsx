import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ThumbsButton from "../ThumbsButton";
import Colors from "../../constants/Colors";
import { AllFeedScreenStyle } from "../../screens/FeedScreen/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface PostCardProps {
	data: PostData;
	navigation: any;
}
const PostCard = ({ data, navigation }: PostCardProps) => {
	const [like, setLike] = useState(data.isLiked);
	const [dislike, setDislike] = useState(data.isDisliked);
	const [likes, setLikes] = useState(data.likes); // number of likes
	const [dislikes, setDislikes] = useState(data.dislikes); // number of dislikes
	const [followed, setFollowed] = useState(data.followed);

	useEffect(() => {
		setLike(data.isLiked);
		setDislike(data.isDisliked);
		setLikes(data.likes);
		setDislikes(data.dislikes);
		setFollowed(data.followed);
	}, [data]);

	const navigateToPostDetail = () => {
		navigation.navigate("PostDetailScreen", {
			data: {
				...data,
				likes: likes,
				dislikes: dislikes,
				isLiked: like,
				isDisliked: dislike,
				followed: followed,
			},
		});
	};

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
			// console.log(followed);
			setFollowed(!followed);
		} catch (error) {
			console.error("Error following user:", error);
		}
	};

	return (
		<TouchableOpacity
			onPress={navigateToPostDetail}
			activeOpacity={1}
			style={[AllFeedScreenStyle.eachPostStyle]}
		>
			<View style={AllFeedScreenStyle.eachPostStyle}>
				<View style={AllFeedScreenStyle.topHeader}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						{/* portion of displying the person's portrait */}
						<Image
							source={{
								uri: data.postPersonImage,
							}}
							style={AllFeedScreenStyle.userPortraitImage}
						/>
						{/* portion of displying the person's name*/}
						<View style={{ paddingLeft: 10 }}>
							<Text style={AllFeedScreenStyle.usersNameStyle}>{data.postAuthorName}</Text>
						</View>
					</View>
					{/* <TouchableOpacity style={AllFeedScreenStyle.followButton}>
						<Text style={AllFeedScreenStyle.followButtonText}>Follow</Text>
					</TouchableOpacity> */}
					{!followed ? (
						<TouchableOpacity style={AllFeedScreenStyle.followButton} onPress={followHandler}>
							<Text style={AllFeedScreenStyle.followButtonText}>Follow</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={AllFeedScreenStyle.unfollowButton} onPress={followHandler}>
							<Text style={AllFeedScreenStyle.unfollowButtonText}>Unfollow</Text>
						</TouchableOpacity>
					)}
				</View>

				<View style={AllFeedScreenStyle.postedImageView}>
					<Image
						source={{ uri: data.postImage }}
						style={AllFeedScreenStyle.postedImageLayout}
						testID={`postImage`}
					/>
				</View>

				<View style={AllFeedScreenStyle.buttonContainer}>
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
									name={like ? "like1" : "like2"}
									size={20}
									color="black"
									style={{
										paddingRight: 10,
										fontSize: 20,
										color: like ? Colors.primary : "black",
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
									name={dislike ? "dislike1" : "dislike2"}
									size={20}
									color="black"
									style={{
										paddingRight: 10,
										fontSize: 20,
										color: dislike ? "red" : "black",
									}}
								/>
							}
							testID={`testThumbDownButton`}
							action={"dislike"}
						/>
						<Text style={AllFeedScreenStyle.likeDislikeNumbers}>{dislikes}</Text>
						{/* Code for handling Comment  button */}
						<TouchableOpacity>
							<Ionicons name="chatbox-ellipses-outline" style={AllFeedScreenStyle.commentButton} />
						</TouchableOpacity>
					</View>
				</View>
				{/* Code for handling post text  button */}
				<View style={AllFeedScreenStyle.postTextContainer}>
					<Text style={AllFeedScreenStyle.postTextStyle}>{data.postText}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default PostCard;
