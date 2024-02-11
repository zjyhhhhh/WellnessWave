import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { height } from "../constants/Layout";
import Colors from "../constants/Colors";
import { useCallback } from "react";

const circleSize = height * 0.07;

const styles = StyleSheet.create({
	circle: {
		alignItems: "center",
		justifyContent: "center",
	},
	iconWrapper: {
		backgroundColor: Colors.gray,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 5,
		borderColor: "transparent",
		width: circleSize,
		height: circleSize,
		borderRadius: circleSize / 2,
	},
	notificationDot: {
		position: "absolute",
		top: 10,
		right: 18,
		width: 10,
		height: 10,
		backgroundColor: "red",
		borderRadius: 5,
	},
});

const BottomTabBarIcon: React.FC<{
	focused: boolean;
	icon: React.ReactNode;
	hasNotification: boolean;
}> = ({ focused, icon, hasNotification }) => {
	const offset = useSharedValue(0);

	const animationConfig = {
		mass: 1,
		damping: 10,
		stiffness: 100,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 2,
	};

	const startAnimation = () => {
		offset.value = withSpring(-height * 0.03, animationConfig);
	};

	const resetAnimation = () => {
		offset.value = withSpring(0, animationConfig);
	};

	useFocusEffect(
		useCallback(() => {
			startAnimation();

			return () => {
				resetAnimation();
			};
		}, [])
	);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}));

	return (
		<Animated.View style={[styles.circle, animatedStyle]}>
			<View
				style={[styles.iconWrapper, { borderColor: focused ? Colors.background : Colors.gray }]}
			>
				{icon}
			</View>
			{hasNotification && <View style={styles.notificationDot} />}
		</Animated.View>
	);
};

export default BottomTabBarIcon;
