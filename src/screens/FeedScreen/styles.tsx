import { StyleSheet } from "react-native";
import Font from "../../constants/Font";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

export const AllFeedScreenStyle = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingTop: 10,
	},
	eachPostStyle: {
		paddingBottom: 10,
		borderBottomColor: "gray",
		borderBottomWidth: 0.1,
		// border
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 10,
		backgroundColor: "#FAFAFA",
		overflow: "hidden",
		// shadow
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	topHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 15,
	},
	userPortraitImage: {
		width: 40,
		height: 40,
		borderRadius: 100,
	},
	usersNameStyle: {
		fontSize: 15,
		fontWeight: "bold",
		fontFamily: Font["poppins-bold"],
	},
	followButton: {
		paddingVertical: Spacing * 0.5,
		paddingHorizontal: Spacing,
		minWidth: 80,
		minHeight: 35,
		borderRadius: Spacing,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		alignItems: "center",
	},
	followButtonText: {
		fontFamily: Font["poppins-bold"],
		color: Colors.gray,
		fontSize: FontSize.small,
		textAlign: "center",
	},
	unfollowButton: {
		paddingVertical: Spacing * 0.5,
		paddingHorizontal: Spacing,
		minWidth: 80,
		minHeight: 35,
		borderRadius: Spacing,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		backgroundColor: Colors.gray,
		justifyContent: "center",
		alignItems: "center",
	},
	unfollowButtonText: {
		fontFamily: Font["poppins-bold"],
		color: Colors.text,
		fontSize: FontSize.small,
		textAlign: "center",
	},
	postedImageView: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	postedImageLayout: {
		width: "100%",
		height: 400,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingTop: 10,
	},
	likeDislikeNumbers: {
		paddingRight: 10,
		fontWeight: "bold",
	},
	commentButton: {
		fontSize: 20,
		paddingRight: 10,
	},
	postTextContainer: {
		paddingHorizontal: 12,
		paddingVertical: 3,
	},
	postTextStyle: {
		fontWeight: "700",
		fontSize: 15,
		paddingVertical: 2,
	},
});

export const PostDetailScreenStyle = StyleSheet.create({
	Headers: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 0,
	},
	backButton: {
		width: 70,
		height: 70,
		justifyContent: "center",
		alignItems: "flex-start",
		marginRight: -30,
	},
	portraitStyle: {
		width: 50,
		height: 50,
		borderRadius: 100,
		marginRight: 15,
	},
	posterNameStyle: {
		fontSize: 15,
		fontWeight: "bold",
		fontFamily: Font["poppins-bold"],
		marginRight: "auto",
	},
	followButtonStyle: {
		paddingVertical: Spacing * 0.5,
		paddingHorizontal: Spacing,
		minWidth: 80,
		minHeight: 35,
		borderRadius: Spacing,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		backgroundColor: Colors.primary,
		justifyContent: "center",
		marginRight: 15,
	},
	followButtonTextStyle: {
		fontFamily: Font["poppins-bold"],
		color: Colors.gray,
		fontSize: FontSize.small,
		textAlign: "center",
	},
	unfollowButtonStyle: {
		paddingVertical: Spacing * 0.5,
		paddingHorizontal: Spacing,
		minWidth: 80,
		minHeight: 35,
		borderRadius: Spacing,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		// backgroundColor: Colors.primary,
		backgroundColor: Colors.gray,
		justifyContent: "center",
		marginRight: 15,
	},
	unfollowButtonTextStyle: {
		fontFamily: Font["poppins-bold"],
		// color: Colors.gray,
		color: Colors.text,
		fontSize: FontSize.small,
		textAlign: "center",
	},
	imageStyle: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	postDateStyle: {
		fontSize: 11, // current setting
		paddingLeft: 5,
		color: "grey",
	},
	separator: {
		height: 1,
		width: "95%",
		backgroundColor: "#e0e0e0",
		marginVertical: 10,
		alignSelf: "center",
	},
	commentCountStyle: {
		fontSize: FontSize.small,
		color: "grey",
		paddingLeft: 5,
	},
});
