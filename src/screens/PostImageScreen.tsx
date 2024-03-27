import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	Button,
	StyleSheet,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { MomentStackParamList, RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

type Props = NativeStackScreenProps<MomentStackParamList, "PostImageScreen">;

const PostImageScreen: React.FC<Props> = ({ route, navigation }) => {
	const { imageBase64 } = route.params;
	const [contextText, setContextText] = useState("");

	async function sendPost(contextText: string, photoURIs: string[], token: string) {
		console.log(photoURIs);
		const postData = {
			contextText: contextText,
			contextImage: photoURIs, // Array of base64 encoded strings
		};

		try {
			console.log("ready to send post data to server...");
			const response = await fetch(`http://127.0.0.1:8000/send_posts/`, {
				method: "POST",
				headers: {
					Authorization: `${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Post successful:", result);
			navigation.goBack();
		} catch (error) {
			console.error("Error sending post:", error);
		}
		// console.log(photoURIs);
		// const formData = new FormData();
		// formData.append('contextText', contextText);

		// photoURIs.forEach((uri, index) => {
		//   formData.append(`contextImage[${index}]`, {
		// 	name: `image${index}.jpg`,
		// 	type: 'image/jpeg',
		// 	uri,
		//   } as any);
		// });

		// console.log(formData);

		// try {
		// 	console.log("ready to send post data to server...");
		//   	const response = await fetch(`http://3.12.198.158:8000/send_posts/`, {
		// 	method: 'POST',
		// 	headers: {
		// 	  'Authorization': `${token}`,
		// 	  'Content-Type': 'application/json',
		// 	},
		// 	// body: formData,
		// 	body: JSON.stringify(formData),
		//   });

		//   if (!response.ok) {
		// 	throw new Error('Network response was not ok');
		//   }

		//   const result = await response.json();
		//   console.log('Post successful:', result);
		// } catch (error) {
		//   console.error('Error sending post:', error);
		// }
	}

	const handlePress = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		if (userToken) {
			await sendPost(contextText, imageBase64, userToken);
		}
	};

	const renderItem = ({ item }: { item: string }) => (
		<Image source={{ uri: `data:image/jpeg;base64,${item}` }} style={styles.image} />
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.Headers}>
				<TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
					<AntDesign name="left" size={24} color="black" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.postButton} onPress={handlePress}>
					<Text style={styles.postButtonText}>Post</Text>
				</TouchableOpacity>
			</View>
			<TextInput
				style={styles.input}
				placeholder="Share Your Moment"
				value={contextText}
				onChangeText={setContextText}
				multiline={true}
			/>
			<FlatList
				data={imageBase64}
				renderItem={renderItem}
				keyExtractor={(_, index) => index.toString()}
				numColumns={3}
				style={styles.imageGrid}
			/>
			<View style={styles.buttonContainer}></View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-start",
		// justifyContent: 'center',
		padding: 20,
	},
	Headers: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 0,
		justifyContent: "space-between",
		width: "100%",
		padding: 6,
	},
	backButton: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "flex-start",
		marginLeft: 10,
	},
	postButton: {
		backgroundColor: "#F0E2D4",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 30,
		elevation: 3,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: "black",
		shadowOpacity: 0.3,
		shadowRadius: 2,
		marginRight: 15,
	},
	postButtonText: {
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
	},
	input: {
		height: "25%",
		width: "95%",
		padding: 15,
		paddingTop: 15,
		marginLeft: 8,
		fontSize: 16,
		textAlignVertical: "top",
		marginBottom: 0,
	},
	imageGrid: {
		flex: 1,
		width: "100%",
		padding: 10,
	},
	image: {
		width: "33%",
		aspectRatio: 1,
		margin: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default PostImageScreen;
