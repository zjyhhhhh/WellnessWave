import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";

interface ThumbsInputProps {
	like: boolean;
	setLike: React.Dispatch<React.SetStateAction<boolean>>;
	dislike: boolean;
	setDislike: React.Dispatch<React.SetStateAction<boolean>>;
	likeCount: number;
	setLikeCount: React.Dispatch<React.SetStateAction<number>>;
	dislikeCount: number;
	setDislikeCount: React.Dispatch<React.SetStateAction<number>>;
	icon: React.ReactNode;
	testID: string;
	postId: string;
	action: "like" | "dislike";
}

const ThumbsButton: React.FC<ThumbsInputProps> = ({
	postId,
	like,
	setLike,
	dislike,
	setDislike,
	likeCount,
	setLikeCount,
	dislikeCount,
	setDislikeCount,
	icon,
	testID,
	action,
}) => {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const triggerAnimation = () => {
		Animated.sequence([
			Animated.timing(scaleAnim, {
				toValue: 1.5,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start();
	};

	const getUserInfo = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		const username = await AsyncStorage.getItem("username");
		return { userToken, username };
	};

	const updatePostLikeDislike = async (postId: string, like: boolean, dislike: boolean) => {
		const { userToken, username } = await getUserInfo();
		try {
			const response = await fetch(`http://127.0.0.1:8000/update_posts/like_dislike/${postId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${userToken}`,
				},
				body: JSON.stringify({
					like: like,
					dislike: dislike,
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		} catch (error) {
			console.error("Error updating post:", error);
		}
	};

	const handleLikePress = async () => {
		const newLikeStatus = !like;
		const newDislikeStatus = dislike && newLikeStatus ? false : dislike;

		setLike(newLikeStatus);
		setDislike(newDislikeStatus);
		setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - (like ? 1 : 0));
		setDislikeCount(newDislikeStatus ? dislikeCount + 1 : dislikeCount - (dislike ? 1 : 0));

		await updatePostLikeDislike(postId, newLikeStatus, newDislikeStatus);

		triggerAnimation();
	};

	const handleDislikePress = async () => {
		const newDislikeStatus = !dislike;
		const newLikeStatus = like && newDislikeStatus ? false : like;

		setDislike(newDislikeStatus);
		setLike(newLikeStatus);
		setDislikeCount(newDislikeStatus ? dislikeCount + 1 : dislikeCount - (dislike ? 1 : 0));
		setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - (like ? 1 : 0));

		await updatePostLikeDislike(postId, newLikeStatus, newDislikeStatus);

		triggerAnimation();
	};

	return (
		<TouchableOpacity
			onPress={action == "like" ? handleLikePress : handleDislikePress}
			testID={`${testID}`}
		>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>{icon}</Animated.View>
		</TouchableOpacity>
	);
};

export default ThumbsButton;
