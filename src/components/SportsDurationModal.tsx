import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import IconComponent from "../constants/SportsIcons";
import { height, width } from "../constants/Layout";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import AppTextInput from "./AppTextInput";

interface SportsDurationModalProps {
	modalVisible: boolean;
	setCloseModal: () => void;
	currentItem: string;
	addHandler: (duration: number) => void;
}

const styles = StyleSheet.create({
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
	buttonTextOn: {
		color: "white",
	},
	buttonTextOff: {
		color: Colors.text,
	},
	textStyle: {
		fontFamily: Font["poppins-semiBold"],
		fontSize: FontSize.medium,
	},
});

const SportsDurationModal = ({
	modalVisible,
	setCloseModal,
	currentItem,
	addHandler,
}: SportsDurationModalProps) => {
	if (!modalVisible) return null;

	const [duration, setDuration] = useState<number | undefined>(undefined);

	const defaultDurationList = [5, 10, 15, 30];

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				setCloseModal();
			}}
			style={{
				margin: 0,
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View
						style={{
							paddingHorizontal: 0.08 * width,
							paddingBottom: 0.01 * height,
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							width: "100%",
							borderBottomWidth: 2,
							borderBottomColor: Colors.gray,
						}}
					>
						<IconComponent activity={currentItem} iconSize={width * 0.13} />
						<Text
							style={{
								fontSize: FontSize.xLarge,
								fontFamily: Font["poppins-semiBold"],
								paddingLeft: 0.03 * width,
							}}
						>
							{currentItem}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							width: "100%",
							paddingHorizontal: 0.03 * width,
						}}
					>
						<Text
							style={{
								fontSize: FontSize.medium,
								fontFamily: Font["poppins-regular"],
								paddingHorizontal: 0.03 * width,
							}}
						>
							Duration
						</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<AppTextInput
								value={duration !== undefined ? duration.toString() : ""}
								inputMode="numeric"
								onChangeText={(text) => setDuration(parseInt(text))}
							/>
							<Text
								style={{
									fontSize: FontSize.medium,
									fontFamily: Font["poppins-regular"],
									paddingLeft: 0.03 * width,
								}}
							>
								min
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingVertical: 0.02 * height,
						}}
					>
						{defaultDurationList.map((defaultDuration) => (
							<TouchableOpacity onPress={() => setDuration(defaultDuration)} key={defaultDuration}>
								{/* <TouchableOpacity> */}
								<View
									style={{
										borderRadius: 8,
										borderColor: Colors.primary,
										borderWidth: 2,
										width: 0.18 * width,
										height: 0.1 * width,
										justifyContent: "center",
										alignItems: "center",
										marginHorizontal: 0.01 * width,
									}}
								>
									<Text
										style={{
											fontSize: FontSize.medium,
											fontFamily: Font["poppins-regular"],
											color: Colors.primary,
										}}
									>
										{defaultDuration} min
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-evenly",
						}}
					>
						<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setCloseModal()}>
							<Text style={[styles.textStyle, styles.buttonTextOff]}>Cancel</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								styles.button,
								duration !== undefined ? styles.buttonOpen : styles.buttonClose,
							]}
							onPress={() => addHandler(duration!)}
							disabled={duration === undefined}
						>
							<Text
								style={
									duration === undefined
										? [styles.textStyle, styles.buttonTextOff]
										: [styles.textStyle, styles.buttonTextOn]
								}
							>
								Add
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default SportsDurationModal;
