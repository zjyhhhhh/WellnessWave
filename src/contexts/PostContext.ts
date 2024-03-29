import { createContext } from "react";
import { PostData } from "../../types";

interface PostsContextType {
	posts: PostData[];
	likedPosts: PostData[];
}
export const PostsContext = createContext<PostsContextType>({ posts: [], likedPosts: [] });
