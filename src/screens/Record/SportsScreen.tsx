import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text } from "react-native";
import { RecordStackParamList } from "../../../types";
import ActivityGrowthBarChart from "../../components/Record/Sports/ActivityGrowthBarChart";
import SportsTypePieChart from "../../components/Record/Sports/SportsTypePieChart";
import { sportsScreenStyles as styles } from "./style";
import { useEffect, useState } from "react";
import { SportsCategories, sportsCategories } from "../../constants/SportsIcons";
import { formatDateToShortMonthDay, generateDateRange } from "../../utils/dateFormater";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

type Props = NativeStackScreenProps<RecordStackParamList, "Sports">;

interface DataItem {
	x: string;
	y: number;
}

interface SportActivity {
	name: string;
	duration: number;
}

interface SportRecord {
	date: string;
	sports: SportActivity[];
}

interface SportResponse {
	records: SportRecord[];
}

function initializeDataItems(dateRange: string[]): DataItem[] {
	return dateRange.map((date) => {
		const formattedDate = formatDateToShortMonthDay(date);
		return { x: formattedDate, y: 0 };
	});
}
const getUserInfo = async () => {
	const userToken = await AsyncStorage.getItem("userToken");
	const username = await AsyncStorage.getItem("username");
	return { userToken, username };
};

const SportsScreen = ({ navigation }: Props) => {
	const date = new Date();
	const isFocused = useIsFocused();
	const currentDate = date.toISOString().slice(0, 10);
	date.setDate(date.getDate() - 7);
	const previousDate = date.toISOString().slice(0, 10);
	const dateRange = generateDateRange(new Date(previousDate), new Date(currentDate));
	const [dataAerobics, setDataAerobics] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [dataBallGames, setDataBallGames] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [dataStrength, setDataStrength] = useState<DataItem[]>(initializeDataItems(dateRange));
	const [sortedSports, setSortedSports] = useState<DataItem[]>([]);
	const [data, setData] = useState<SportResponse>({ records: [] });

	useEffect(() => {
		const transformData = (jsonData: any[]) => {
			return jsonData.map((record) => {
				return {
					date: record.log_date.split("T")[0], // 从 ISO 字符串中提取日期部分
					sports: record.sports.map((sport: { name: string; duration: number }) => ({
						name: sport.name,
						duration: sport.duration,
					})),
				};
			});
		};
		const fetchData = async () => {
			const { userToken, username } = await getUserInfo();
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/get_user_sports/?startDate=${previousDate}&endDate=${currentDate}`,
					{
						method: "GET",
						headers: {
							Authorization: `${userToken}`,
						},
					}
				);
				const jsonData = await response.json();
				const transformedData = transformData(jsonData);

				setData({ records: transformedData });
			} catch (error) {
				console.error("Network error:", error);
			}
		};
		if (isFocused) {
			fetchData();
		}
	}, [previousDate, currentDate, isFocused]);

	useEffect(() => {
		const newDataAerobics = [...dataAerobics];
		const newDataBallGames = [...dataBallGames];
		const newDataStrength = [...dataStrength];
		const sportsDurationSum: { [key: string]: number } = {};

		dateRange.forEach((date, index) => {
			const record = data.records.find((record) => record.date === date);

			const updateDuration = (category: keyof SportsCategories, updateState: DataItem[]) => {
				const duration = record
					? record.sports
							.filter((sport) => sportsCategories[category].includes(sport.name))
							.reduce((acc, sport) => acc + sport.duration, 0)
					: 0;
				updateState[index].y = duration;
			};

			updateDuration("aerobics", newDataAerobics);
			updateDuration("ballgames", newDataBallGames);
			updateDuration("strength", newDataStrength);

			if (record) {
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
	}, [data]);

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
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SportsScreen;
