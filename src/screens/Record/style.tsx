import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Layout";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";

export const recordStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: "white",
		padding: 0.02 * width,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
		height: 0.06 * height,
	},
	headerText: {
		fontSize: 18,
		paddingVertical: 0.015 * width,
		fontFamily: Font["poppins-semiBold"],
	},
	searchBar: {
		backgroundColor: Colors.gray,
		height: 0.04 * height,
		borderRadius: 0.02 * height,
		marginHorizontal: 0.045 * width,
		marginVertical: 0.012 * height,
		paddingHorizontal: 0.04 * width,
		paddingVertical: 0.01 * height,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	mainContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	sidebarContainer: {
		backgroundColor: Colors.secondary,
		width: "32%",
		height: " 100%",
		borderTopRightRadius: 0.06 * width,
	},
	itemCategoryPickerContainer: {
		height: "30%",
		marginTop: 0.03 * height,
	},
	itemContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		marginTop: 0.02 * height,
	},
	itemCategoryTitle: {
		fontSize: 18,
		fontFamily: Font["poppins-semiBold"],
		marginLeft: 0.04 * width,
		marginBottom: 0.01 * height,
	},
	cart: {
		height: 0.2 * height,
		backgroundColor: Colors.background,
		paddingVertical: 0.02 * height,
		justifyContent: "flex-start",
		alignContent: "flex-start",
	},
	cartTitle: {
		fontSize: FontSize.medium,
		fontFamily: Font["poppins-semiBold"],
		color: Colors.darkText,
		paddingHorizontal: 0.1 * width,
	},
	bottomContainer: {
		height: 0.08 * height,
		backgroundColor: Colors.background,
		borderTopWidth: 2,
		borderTopColor: Colors.gray,
		paddingLeft: 0.1 * width,
		paddingRight: 0.08 * width,
		marginBottom: 0.015 * height,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	bottom: {
		flexDirection: "row",
		alignContent: "flex-start",
		alignItems: "center",
	},
	bottomCount: {
		position: "absolute",
		right: 0,
		top: 0,
		borderWidth: 2,
		borderColor: Colors.primary,
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomCountText: {
		color: Colors.primary,
		fontFamily: Font["poppins-semiBold"],
	},
	bottomTitle: {
		fontSize: FontSize.large,
		fontFamily: Font["poppins-semiBold"],
		paddingLeft: 0.05 * width,
	},
	bottomButton: {
		width: "30%",
		height: "70%",
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 0.03 * width,
	},
	bottomButtonText: {
		fontSize: FontSize.large,
		fontFamily: Font["poppins-semiBold"],
	},
});

export const sportsScreenStyles = StyleSheet.create({
	header: {
		backgroundColor: "white",
		padding: 0.04 * width,
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "space-between",
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
		height: 0.06 * height,
	},
	bodyContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: height * 0.45,
		paddingHorizontal: width * 0.08,
		paddingVertical: height * 0.02,
	},
	growthContainer: {
		height: "100%",
		width: "100%",
		borderRadius: 20,
		shadowColor: Colors.text,
		backgroundColor: Colors.background,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	growthTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: "5%",
		paddingHorizontal: "10%",
	},
	growthTitle: {
		color: Colors.text,
		fontSize: FontSize.large,
		fontFamily: Font["poppins-semiBold"],
	},
});
