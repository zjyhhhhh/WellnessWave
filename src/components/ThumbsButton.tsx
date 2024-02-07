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
}

const ThumbsButton: React.FC<ThumbsInputProps> = ({
	like,
	setLike,
	dislike,
	setDislike,
	likeCount,
	setLikeCount,
	dislikeCount,
	setDislikeCount,
	icon,
    testID
}) => {
	const scaleAnim = useRef(new Animated.Value(1)).current;

	const handleLikePress = () => {
        console.log("Before likes", likeCount)
		setLike(!like);
		if (!like) {
			setLikeCount(likeCount + 1);
			if (dislike) {
				setDislike(false);
				setDislikeCount(dislikeCount - 1);
			}
		} else {
			setLikeCount(likeCount - 1);
		} 

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

		console.log("current likes: " + likeCount);
	};

	return (
		<TouchableOpacity onPress={handleLikePress} testID={`${testID}`}>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>{icon}</Animated.View>
		</TouchableOpacity>
	);
};

export default ThumbsButton;
