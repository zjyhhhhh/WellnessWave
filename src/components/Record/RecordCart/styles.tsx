import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Layout";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import Colors from "../../../constants/Colors";

export const selectRowStyles = StyleSheet.create({
	foodRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: "10%",
		paddingVertical: "3%",
		borderBottomColor: Colors.gray,
		borderBottomWidth: 2,
		width: "100%",
	},
	foodRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 0.008 * width,
	},
	foodName: {
		fontSize: FontSize.medium,
		color: Colors.text,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.02 * width,
	},
});

export const deleteRowStyles = StyleSheet.create({
	itemRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: "3%",
		paddingHorizontal: "10%",
		width: "100%",
	},
	iconNameContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "60%",
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	itemName: {
		color: Colors.text,
		paddingLeft: 0.02 * width,
	},
	durationContainer: {
		borderWidth: 2,
		borderColor: Colors.gray,
		borderRadius: 15,
		paddingVertical: width * 0.01,
		paddingHorizontal: width * 0.04,
		marginLeft: width * 0.03,
	},
	textStyle: {
		fontFamily: Font["poppins-regular"],
		fontSize: FontSize.medium,
	},
});

export const BottomContainerStyles = StyleSheet.create({
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

export const SidebarCategoryPickerstyles = (activate: boolean) =>
	StyleSheet.create({
		typeContainer: {
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "center",
			marginLeft: 0.05 * width,
			marginBottom: 0.01 * height,
			backgroundColor: activate ? "white" : undefined,
			padding: 0.02 * width,
			borderTopLeftRadius: 0.06 * width,
			borderBottomLeftRadius: 0.06 * width,
		},
		typeText: {
			fontSize: FontSize.medium,
			fontFamily: Font["poppins-semiBold"],
			color: activate ? Colors.primary : Colors.darkGray,
		},
	});

export const SportsDurationModalStyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingVertical: 0.03 * height,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: 0.9 * width,
	},
	iconNameContainer: {
		paddingHorizontal: 0.08 * width,
		paddingBottom: 0.01 * height,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
	},
	iconName: {
		fontSize: FontSize.xLarge,
		fontFamily: Font["poppins-semiBold"],
		paddingLeft: 0.03 * width,
	},
	durationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 0.03 * width,
	},
	durationText: {
		paddingHorizontal: 0.03 * width,
	},
	durationInputContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	durationInputUnit: {
		fontSize: FontSize.medium,
		fontFamily: Font["poppins-regular"],
		paddingLeft: 0.03 * width,
	},
	durationButtonContainer: {
		borderRadius: 8,
		borderColor: Colors.primary,
		borderWidth: 2,
		width: 0.18 * width,
		height: 0.1 * width,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 0.01 * width,
	},
	durationButtonText: {
		color: Colors.primary,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	button: {
		borderRadius: 15,
		elevation: 2,
		padding: 0.04 * width,
		marginVertical: 0.02 * width,
		marginHorizontal: 0.06 * width,
		width: 0.23 * width,
		alignItems: "center",
	},
	buttonOpen: {
		backgroundColor: Colors.primary,
	},
	buttonClose: {
		backgroundColor: Colors.gray,
	},
	buttonTextOpen: {
		color: "white",
	},
	buttonTextClose: {
		color: Colors.text,
	},
	semiBoldTextStyle: {
		fontFamily: Font["poppins-semiBold"],
		fontSize: FontSize.medium,
	},
	textStyle: {
		fontSize: FontSize.medium,
		fontFamily: Font["poppins-regular"],
	},
});
