import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text } from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import { RecordStackParamList } from "../../../types";
import { height, width } from "../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";
import ActivityGrowthBarChart from "../../components/Record/Sports/ActivityGrowthBarChart";
import SportsTypePieChart from "../../components/Record/Sports/SportsTypePieChart";
import { sportsScreenStyles as styles } from "./style";
import { useEffect, useState } from "react";
import { SportsCategories, sportsCategories } from "../../constants/SportsIcons";
import { formatDateToShortMonthDay, generateDateRange } from "../../utils/dateFormater";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryLine } from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

type Props = NativeStackScreenProps<RecordStackParamList, "Sports">;

interface DataItem {
	x: string;
	y: number;
}

function initializeDataItems(dateRange: string[]): DataItem[] {
	return dateRange.map((date) => {
		const formattedDate = formatDateToShortMonthDay(date);
		return { x: formattedDate, y: 0 };
	});
}

const SportsScreen = ({ navigation }: Props) => {
	const date = new Date();
	const currentDate = date.toISOString().slice(0, 10);
	date.setDate(date.getDate() - 7);
	const previousDate = date.toLocaleString().slice(0, 10);
	const dateRange = generateDateRange(new Date("2024-02-20"), new Date("2024-02-26"));
	const [dataAerobics, setDataAerobics] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [dataBallGames, setDataBallGames] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [dataStrength, setDataStrength] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [sortedSports, setSortedSports] = useState<DataItem[]>([]);
	useEffect(() => {
		// GET /record/{userId}/range?startDate=2024-02-20&endDate=2024-02-27
		// const response = fetch(
		// 	`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/record/1/range?startDate=${previousDate}&endDate=${currentDate}`
		// );
		const response = {
			records: [
				{
					date: "2024-02-20",
					sports: [
						{ name: "Running", duration: 30 },
						{ name: "Swimming", duration: 13 },
						{ name: "Cycling", duration: 10 },
					],
				},
				{
					date: "2024-02-21",
					sports: [
						{ name: "Yoga", duration: 10 },
						{ name: "Skiing", duration: 50 },
					],
				},
				{
					date: "2024-02-22",
					sports: [
						{ name: "Basketball", duration: 60 },
						{ name: "Swimming", duration: 20 },
					],
				},
				{
					date: "2024-02-23",
					sports: [
						{ name: "Weightlifting", duration: 60 },
						{ name: "Running", duration: 30 },
					],
				},
				{
					date: "2024-02-24",
					sports: [{ name: "Running", duration: 30 }],
				},
				{
					date: "2024-02-25",
					sports: [{ name: "Yoga", duration: 30 }],
				},
				{
					date: "2024-02-26",
					sports: [
						{ name: "Weightlifting", duration: 40 },
						{ name: "Running", duration: 30 },
					],
				},
			],
		};
		const newDataAerobics = [...dataAerobics];
		const newDataBallGames = [...dataBallGames];
		const newDataStrength = [...dataStrength];
		const sportsDurationSum: { [key: string]: number } = {};

		dateRange.forEach((date, index) => {
			const record = response.records.find((record) => record.date === date);
			if (record) {
				const updateDuration = (category: keyof SportsCategories, updateState: DataItem[]) => {
					const duration = record.sports
						.filter((sport) => sportsCategories[category].includes(sport.name))
						.reduce((acc, sport) => acc + sport.duration, 0);
					updateState[index].y = duration;
				};

				updateDuration("aerobics", newDataAerobics);
				updateDuration("ballgames", newDataBallGames);
				updateDuration("strength", newDataStrength);

				record.sports.forEach(({ name, duration }) => {
					sportsDurationSum[name] = (sportsDurationSum[name] || 0) + duration;
				});
			}
		});

		const entries: DataItem[] = Object.entries(sportsDurationSum)
			.sort((a, b) => b[1] - a[1])
			.reduce<DataItem[]>((acc, [sportName, duration], index) => {
				if (index < 5) {
					acc.push({ x: sportName, y: duration });
				} else if (index === 5) {
					acc.push({ x: "Others", y: duration });
				} else {
					const others = acc.find((item) => item.x === "Others");
					if (others) {
						others.y += duration;
					}
				}
				return acc;
			}, []);

		setSortedSports(entries);
		setDataAerobics(newDataAerobics);
		setDataBallGames(newDataBallGames);
		setDataStrength(newDataStrength);
	}, []);

	const data = [
		{ x: 1, y: 70 },
		{ x: 2, y: 100 },
		{ x: 3, y: 80 },
		{ x: 4, y: 90 },
		{ x: 5, y: 70 },
		{ x: 6, y: 100 },
	];

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<DatePickerHeader
				backHandler={() => navigation.goBack()}
				addHandler={() => navigation.navigate("SportsRecord")}
			/>
			<View style={{ flex: 1 }}>
				<View style={styles.bodyContainer}>
					<View style={styles.growthContainer}>
						<View style={styles.growthTitleContainer}>
							<Text style={styles.growthTitle}>Activity Growth</Text>
						</View>
						<ActivityGrowthBarChart
							dataAerobics={dataAerobics}
							dataBallGames={dataBallGames}
							dataStrength={dataStrength}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<SportsTypePieChart data={sortedSports} />
						{/* <VictoryChart>
							<Defs>
								<LinearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
									<Stop offset="0%" stopColor="green" stopOpacity="1" />
									<Stop offset="100%" stopColor="green" stopOpacity="0" />
								</LinearGradient>
							</Defs>
							<VictoryArea
								style={{
									data: { fill: "url(#myGradient)" },
								}}
								data={data}
								interpolation="natural"
							/>
							<VictoryAxis
								style={{
									axis: { stroke: "transparent" },
									ticks: { stroke: "transparent" },
									tickLabels: { fill: "transparent" },
								}}
							/>
							<VictoryAxis
								dependentAxis
								style={{
									axis: { stroke: "transparent" },
									ticks: { stroke: "transparent" },
									tickLabels: { fill: "transparent" },
								}}
							/>
						</VictoryChart> */}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SportsScreen;
