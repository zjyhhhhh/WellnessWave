import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { Text, StyleSheet, SafeAreaView, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { width, height } from "../../constants/Layout";
import RulerImage from "../../assets/Health/rulerImage.svg";
import MaleClothes from "../../assets/Health/Male-Clothes.svg";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import BodyMassIndexIndicator from "../../components/Record/Health/BodyMassIndexIndicator";
import BodyInfoCurveGraphDisplay from "../../components/Record/Health/healthInfoCurveGraph";
import BodyInfoType from "../../constants/BodyInfoType";
import BloodPressureSVG from "../../assets/Health/Blood-Pressure.svg";
import BloodSugarSVG from "../../assets/Health/Blood-Sugar.svg";
import HeartRateSVG from "../../assets/Health/Heart-Rate.svg";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RecordStackParamList, "HealthFrontPageScreen">;

interface HealthData {
	basicInfo: {
		height: number;
		weight: number;
		bmi: number;
	};
	healthIndex: {
		heartRate: number[];
		bloodSugar: number[];
		bloodPressure: number[];
	};
	bodyMeasurement: {
		chest: [number, boolean | undefined];
		waist: [number, boolean | undefined];
		hip: [number, boolean | undefined];
	};
	lastCheckedDate: number;
}
const HealthFrontPageScreen = ({ navigation }: Props) => {
	const isFocus = useIsFocused();
	const [data, setData] = useState<HealthData>({
		basicInfo: {
			height: 170,
			weight: 70,
			bmi: 22.5,
		},
		healthIndex: {
			heartRate: [50, 10, 40, 95, 85, 91, 35, 53, 24, 50],
			bloodSugar: [47, 20, 55, 95, 71, 59, 40, 71, 61, 20],
			bloodPressure: [30, 80, 85, 92, 55, 67, 88, 45, 95, 20],
		},
		bodyMeasurement: {
			chest: [44.5, true], // true means increase
			waist: [34, false], // false means decrease
			hip: [42.5, undefined], // undefined means no change
		},
		lastCheckedDate: 1,
	});

	useEffect(() => {
		const fetchData = async () => {
			const userToken = await AsyncStorage.getItem("userToken");

			const response = await fetch(`http://127.0.0.1:8000/get_user_health_info/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${userToken}`,
				},
			});
			const jsonData = await response.json();
			setData(jsonData);
		};
		if (isFocus) {
			fetchData();
		}
	}, [isFocus]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<AntDesign
					name="arrowleft"
					size={0.06 * width}
					color="black"
					onPress={() => {
						navigation.navigate("History");
					}}
				/>
				<AntDesign
					name="plus"
					size={0.06 * width}
					color="black"
					onPress={() => {
						navigation.navigate("LogHealthInfoScreen");
					}}
				/>
			</View>
			<View style={styles.firstRowContainer}>
				<View style={styles.heightBoxContainer}>
					<View style={styles.containerSize}>
						<View style={styles.boxOuterlook}>
							<View style={styles.rulerPadding}>
								<RulerImage height={height * 0.02} width={width * 0.2} />
							</View>
							<View style={styles.heightValueContainer}>
								<Text style={styles.heightText}> Height</Text>
								<Text style={styles.heightValue}>{data.basicInfo.height} cm</Text>
							</View>
						</View>
						<View style={styles.weightBoxContainer}>
							<View style={styles.weightRuler}>
								<RulerImage height={height * 0.02} width={width * 0.2} />
							</View>
							<View style={styles.weightValueContainer}>
								<Text style={styles.weightText}>Weight</Text>
								<Text style={styles.weightValue}>{data.basicInfo.weight} kg</Text>
							</View>
						</View>
					</View>

					<View style={styles.BMIContainer}>
						<View style={styles.BMITitle}>
							<Text style={styles.BMIText}>Body Mass Index (BMI)</Text>
						</View>
						<View style={styles.BMISecondRow}>
							<View style={styles.BMIValueContainer}>
								<Text style={styles.BMIValue}>{data.basicInfo.bmi}</Text>
							</View>
							<View style={styles.BMIIndicatorBox}>
								<Text style={styles.BMIIndicatorMessage}>You're healthy</Text>
							</View>
						</View>
						<View style={styles.BMIIndicatorContainer}>
							<BodyMassIndexIndicator BMI_Value={data.basicInfo.bmi} />
						</View>
					</View>
				</View>

				<View style={styles.secondRowContainer}>
					<BodyInfoCurveGraphDisplay
						icon={<HeartRateSVG width={width * 0.08} height={height * 0.08} />}
						type={BodyInfoType.HeartRate}
						value={data.healthIndex.heartRate}
					/>
					<BodyInfoCurveGraphDisplay
						icon={<BloodSugarSVG width={width * 0.08} height={height * 0.08} />}
						type={BodyInfoType.BloodSugar}
						value={data.healthIndex.bloodSugar}
					/>
					<BodyInfoCurveGraphDisplay
						icon={<BloodPressureSVG width={width * 0.08} height={height * 0.08} />}
						type={BodyInfoType.BloodPressure}
						value={data.healthIndex.bloodPressure}
					/>
				</View>

				<View style={styles.thirdRowContainer}>
					<View style={styles.bodyMeasurementContainer}>
						<View style={styles.measureDateContainer}>
							<Text style={styles.bodyMeasurementText}>Body Measurement</Text>
							<Text style={styles.bodyMeasurementDate}>
								Last Checked {data.lastCheckedDate > 0 ? `${data.lastCheckedDate}` : `Today`}
							</Text>
						</View>
						<View style={styles.bodyInfoContainer}>
							<View style={styles.bodyInfoBox}>
								<Text style={{ fontSize: FontSize.medium, paddingTop: "13%" }}>Chest (in)</Text>
								<View style={styles.bodyInfoSecondRowContainer}>
									<View style={styles.bodyInfoSecondRowTextContainer}>
										<Text style={{ fontSize: 22, marginRight: "5%" }}>
											{data.bodyMeasurement.chest}
										</Text>
									</View>
									{data.bodyMeasurement.chest[1] === true ? (
										<AntDesign name="arrowup" size={24} color="red" />
									) : data.bodyMeasurement.chest[1] === false ? (
										<AntDesign name="arrowdown" size={24} color="green" />
									) : (
										<AntDesign name="minus" size={24} color="gray" />
									)}
								</View>
							</View>
							<View style={styles.bodyInfoBox}>
								<Text style={{ fontSize: FontSize.medium, paddingTop: "13%" }}>Waist (in)</Text>
								<View style={styles.bodyInfoSecondRowContainer}>
									<View style={styles.bodyInfoSecondRowTextContainer}>
										<Text style={{ fontSize: 22, marginRight: "5%" }}>
											{data.bodyMeasurement.waist}
										</Text>
									</View>
									{data.bodyMeasurement.waist[1] === true ? (
										<AntDesign name="arrowup" size={24} color="red" />
									) : data.bodyMeasurement.waist[1] === false ? (
										<AntDesign name="arrowdown" size={24} color="green" />
									) : (
										<AntDesign name="minus" size={24} color="gray" />
									)}
								</View>
							</View>
							<View style={styles.bodyInfoBox}>
								<Text style={{ fontSize: FontSize.medium, paddingTop: "13%" }}>Hip (in)</Text>
								<View style={styles.bodyInfoSecondRowContainer}>
									<View style={styles.bodyInfoSecondRowTextContainer}>
										<Text style={{ fontSize: 22, marginRight: "5%" }}>
											{data.bodyMeasurement.hip}
										</Text>
									</View>
									<AntDesign name="arrowdown" size={24} color="green" />
								</View>
							</View>
						</View>
					</View>
					<View style={styles.avatarPicContainer}>
						<MaleClothes height={height * 0.35} width={width * 0.35} />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default HealthFrontPageScreen;

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
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
		height: 0.06 * height,
	},
	firstRowContainer: {
		height: "100%",
		marginTop: 0.04 * height,
		marginHorizontal: 0.07 * width,
	},
	heightBoxContainer: {
		height: 0.15 * height,
		flexDirection: "row",
		justifyContent: "space-around",
		alignContent: "space-between",
	},
	containerSize: {
		width: "40%",
		height: "100%",
		justifyContent: "space-between",
	},
	boxOuterlook: {
		height: "45%",
		borderRadius: 10,
		backgroundColor: Colors.secondary,
	},
	rulerPadding: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingRight: "5%",
		paddingTop: "8%",
	},
	heightValueContainer: {
		flex: 1,
		flexDirection: "row",
		paddingLeft: "4%",
		alignContent: "center",
		paddingTop: "5%",
	},
	heightText: {
		fontSize: FontSize.small,
		fontFamily: Font["poppins-regular"],
		paddingRight: "15%",
	},
	heightValue: {
		fontSize: 10,
		fontFamily: Font["poppins-regular"],
	},
	weightBoxContainer: {
		height: "45%",
		backgroundColor: "#DCF4FC",
		borderRadius: 10,
	},
	weightRuler: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingRight: "5%",
		paddingTop: "8%",
	},
	weightValueContainer: {
		flex: 1,
		flexDirection: "row",
		paddingLeft: "4%",
		alignContent: "center",
		paddingTop: "5%",
	},
	weightText: {
		fontSize: FontSize.small,
		fontFamily: Font["poppins-regular"],
		paddingRight: "15%",
	},
	weightValue: {
		fontSize: 10,
		fontFamily: Font["poppins-regular"],
	},
	BMIContainer: {
		width: width * 0.5,
		height: "100%",
		backgroundColor: "#ECECEC",
		marginLeft: "5%",
		borderRadius: 10,
	},
	BMITitle: {
		flexDirection: "row",
		alignContent: "flex-start",
		padding: "6%",
		// backgroundColor: "yellow",
	},
	BMIText: {
		fontSize: FontSize.small,
		fontFamily: Font["poppins-regular"],
	},
	BMISecondRow: {
		flexDirection: "row",
		height: "25%",
		alignContent: "center",
		justifyContent: "space-between",
		// backgroundColor: 'yellow'
	},
	BMIValueContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: 'yellow'
	},
	BMIValue: {
		textAlign: "center",
		fontSize: FontSize.large,
	},
	BMIIndicatorBox: {
		width: "47%",
		height: "100%",
		backgroundColor: "#D6FFDD",
		marginRight: "10%",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	BMIIndicatorMessage: {
		fontSize: 13,
	},
	BMIIndicatorContainer: {
		height: "40%",
		flexDirection: "row",
		// backgroundColor: 'yellow',
		padding: 10,
		marginLeft: "5%",
	},
	secondRowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		// alignContent: 'space-between',
		// alignItems: 'center', // 更正为alignItems以垂直居中子视图
		// backgroundColor: "red",
		height: "20%",
		width: "100%",
		paddingTop: "2%",
		paddingBottom: "2%",
		marginVertical: "3%",
	},
	secondRowBox: {
		borderRadius: 10,
		borderWidth: 1.2,
		borderColor: "#C4C4C4",
		width: "30%",
		height: "100%",
		// marginHorizontal: "1.5%
	},
	titleContainer: {
		height: "30%",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		// justifyContent: 'center',
	},
	IconContainer: {
		borderRadius: 10,
		height: "80%",
		width: "33%",
		backgroundColor: "#FBF1F3",
		alignItems: "center",
		justifyContent: "center",
		marginRight: "5%",
		marginLeft: "5%",
	},

	thirdRowContainer: {
		width: "100%",
		height: height * 0.33,
		flexDirection: "row",
	},
	bodyMeasurementContainer: {
		flexDirection: "column",
		width: "50%",
		height: "100%",
		paddingBottom: "5%",
	},
	bodyMeasurementText: {
		fontSize: FontSize.small,
	},
	bodyMeasurementDate: {
		fontSize: 9,
	},
	avatarPicContainer: {
		flexDirection: "column",
		width: "50%",
		height: "100%",
		// alignItems: 'center',
		marginRight: "50%",
	},
	measureDateContainer: {
		flexDirection: "column",
		height: "15%",
		// backgroundColor: 'yellow',
	},
	bodyInfoContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	bodyInfoBox: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#C4C4C4",
		width: "65%",
		height: "35%",
		marginBottom: "7%",
		marginRight: "20%",
		alignItems: "center",
	},
	bodyInfoSecondRowContainer: {
		flexDirection: "row",
		width: "100%",
		marginLeft: "5%",
		paddingTop: "8%",
	},
	bodyInfoSecondRowTextContainer: {
		width: "40%",
		marginRight: "3%",
		marginLeft: "15%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: 'yellow'
	},
});
