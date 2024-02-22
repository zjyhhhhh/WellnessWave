import React, { useState } from "react";
import { Modal, View, Text, Pressable, TouchableOpacity } from "react-native";
import SportsIconComponent from "../../../constants/SportsIcons";
import { height, width } from "../../../constants/Layout";
import AppTextInput from "../../Welcome/AppTextInput";
import { SportsDurationModalStyles as styles } from "./styles";

interface SportsDurationModalProps {
	modalVisible: boolean;
	setCloseModal: () => void;
	currentItem: string;
	addHandler: (duration: number) => void;
}

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
					<View style={styles.iconNameContainer}>
						<SportsIconComponent activity={currentItem} iconSize={width * 0.13} />
						<Text style={styles.iconName}>{currentItem}</Text>
					</View>
					<View style={styles.durationContainer}>
						<Text style={[styles.textStyle, styles.durationText]}>Duration</Text>
						<View style={styles.durationInputContainer}>
							<AppTextInput
								value={duration !== undefined ? duration.toString() : ""}
								inputMode="numeric"
								onChangeText={(text) => setDuration(parseInt(text))}
							/>
							<Text style={styles.durationInputUnit}>min</Text>
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
								<View style={styles.durationButtonContainer}>
									<Text style={[styles.textStyle, styles.durationButtonText]}>
										{defaultDuration} min
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
					<View style={styles.buttonContainer}>
						<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setCloseModal()}>
							<Text style={[styles.semiBoldTextStyle, styles.buttonTextClose]}>Cancel</Text>
						</Pressable>
						<Pressable
							style={() => [
								styles.button,
								duration !== undefined ? styles.buttonOpen : styles.buttonClose,
							]}
							onPress={() => addHandler(duration!)}
							disabled={duration === undefined}
						>
							<Text
								style={
									duration === undefined
										? [styles.semiBoldTextStyle, styles.buttonTextClose]
										: [styles.semiBoldTextStyle, styles.buttonTextOpen]
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
