import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput } from "react-native";
import { height, width } from "../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RecordStackParamList, "LogHealthInfoScreen">;

const LogHealthInfoScreen = ({ navigation }: Props) => {
	const [heightInfo, setHeightInfo] = useState("");
	const [weightInfo, setWeightInfo] = useState("");

	const [heartRate, setHeartRate] = useState("");
	const [bloodSugar, setBloodSugar] = useState("");
	const [bloodPressure, setBloodPressure] = useState("");

	const [chest, setChest] = useState("");
	const [waist, setWaist] = useState("");
	const [hip, setHip] = useState("");

	const saveHandler = async () => {
		const userToken = await AsyncStorage.getItem("userToken");
		const username = await AsyncStorage.getItem("username");
		if (
			!heightInfo &&
			!weightInfo &&
			!heartRate &&
			!bloodSugar &&
			!bloodPressure &&
			!chest &&
			!waist &&
			!hip
		)
			return;
		console.log(username);
		const healthInfo = {
			username: username,
			basicInfo: {
				height: parseFloat(heightInfo),
				weight: parseFloat(weightInfo),
				bmi: parseFloat(weightInfo) / (parseFloat(heightInfo) / 100) ** 2,
			},
			healthIndex: {
				heartRate: parseInt(heartRate),
				bloodSugar: parseFloat(bloodSugar),
				bloodPressure: [
					parseInt(bloodPressure.split("/")[0]),
					parseInt(bloodPressure.split("/")[1]),
				],
			},
			bodyMeasurement: {
				chest: parseFloat(chest),
				waist: parseFloat(waist),
				hip: parseFloat(hip),
			},
		};
		try {
			const response = await fetch("http://127.0.0.1:8000/post_user_health_info/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${userToken}`,
				},
				body: JSON.stringify(healthInfo),
			});
			if (!response.ok) {
				console.error("Server responded with status", response.status);
				return;
			}
			navigation.goBack();
		} catch (error) {
			console.error("Error saving health info", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<AntDesign
					name="arrowleft"
					size={0.06 * width}
					color="grey"
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<TouchableOpacity onPress={saveHandler}>
					<Text style={{ fontSize: FontSize.medium, color: Colors.darkGray }}>SAVE</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.contentContainer}>
				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Basic information</Text>
					<View style={styles.inputContainer}>
						<Text>Height (cm)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setHeightInfo}
							value={heightInfo}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text>Weight (kg)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setWeightInfo}
							value={weightInfo}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Health Index</Text>
					<View style={styles.inputContainer}>
						<Text>Heart Rate (bpm)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setHeartRate}
							value={heartRate}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text>Blood Sugar (mg/dl)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setBloodSugar}
							value={bloodSugar}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text>Blood pressure (mmhg)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setBloodPressure}
							value={bloodPressure}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
				</View>

				<View style={styles.sectionContainer}>
					<Text style={styles.sectionTitle}>Body Measurement</Text>
					<View style={styles.inputContainer}>
						<Text>Chest (in)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setChest}
							value={chest}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text>Waist (in)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setWaist}
							value={waist}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text>Hip (in)</Text>
						<TextInput
							style={styles.input}
							onChangeText={setHip}
							value={hip}
							placeholderTextColor="grey"
							keyboardType="numeric"
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: "white",
		padding: 0.04 * width,
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "grey",
		height: 0.06 * height,
	},

	contentContainer: {
		padding: 0.04 * width,
	},
	sectionContainer: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: FontSize.large,
		fontWeight: "bold",
		marginBottom: 10,
	},
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 8,
	},
	input: {
		backgroundColor: "#F7F7F7",
		borderRadius: 5,
		padding: 8,
		width: "30%",
		textAlign: "right",
	},
});

export default LogHealthInfoScreen;
