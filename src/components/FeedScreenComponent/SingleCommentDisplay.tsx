import React from "react";
import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SingleCommentDisplayStyles as styles } from "./styles";

type CommentProps = {
	username: string;
	avatar: string;
	text: string;
	date: string;
};

const SingleCommentDisplay: React.FC<CommentProps> = ({ username, avatar, text, date }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: avatar,
				}}
				style={styles.avatar}
			/>
			<View style={styles.content}>
				<Text style={styles.username}>{username}</Text>
				<Text style={styles.text}>{text}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</View>
	);
};

export default SingleCommentDisplay;
