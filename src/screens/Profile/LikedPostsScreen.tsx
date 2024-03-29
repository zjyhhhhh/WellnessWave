import { SafeAreaView, ScrollView } from "react-native";
import PostCard from "../../components/FeedScreenComponent/PostCard";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { PostData } from "../../../types";
import { PostsContext } from "./MainScreen";

type TopTabParamList = {
	MyPosts: undefined;
	Liked: undefined;
};

type Props = MaterialTopTabScreenProps<TopTabParamList, "Liked">;

const LikedPostsScreen = ({ navigation }: Props) => {
	const posts = useContext(PostsContext).likedPosts;

	return (
		<SafeAreaView>
			<ScrollView
				style={{
					paddingHorizontal: 10,
					paddingTop: 10,
				}}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
			>
				{posts?.map((post: PostData) => (
					<PostCard data={post} navigation={navigation} key={post.postId} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default LikedPostsScreen;