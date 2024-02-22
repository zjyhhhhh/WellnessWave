import {
	VictoryBar,
	VictoryChart,
	VictoryStack,
	VictoryAxis,
	VictoryTheme,
	VictoryLegend,
} from "victory-native";
import { height, width } from "../../../constants/Layout";
import { View } from "react-native";
import Colors from "../../../constants/Colors";
import Font from "../../../constants/Font";

interface DataItem {
	x: string;
	y: number;
}

const dataAerobics: DataItem[] = [
	{ x: "Jan 29", y: 20 },
	{ x: "Jan 30", y: 30 },
	{ x: "Jan 31", y: 50 },
	{ x: "Feb 1", y: 60 },
	{ x: "Feb 2", y: 70 },
	{ x: "Feb 3", y: 80 },
	{ x: "Feb 4", y: 90 },
];

const dataBallGames: DataItem[] = [
	{ x: "Jan 29", y: 40 },
	{ x: "Jan 30", y: 10 },
	{ x: "Jan 31", y: 20 },
	{ x: "Feb 1", y: 30 },
	{ x: "Feb 2", y: 40 },
	{ x: "Feb 3", y: 50 },
	{ x: "Feb 4", y: 60 },
];

const dataStrength: DataItem[] = [
	{ x: "Jan 29", y: 30 },
	{ x: "Jan 30", y: 50 },
	{ x: "Jan 31", y: 70 },
	{ x: "Feb 1", y: 80 },
	{ x: "Feb 2", y: 50 },
	{ x: "Feb 3", y: 30 },
	{ x: "Feb 4", y: 30 },
];

const colors = {
	aerobics: "#CA6B6E",
	ballGames: "#47898F",
	strength: "#D08627",
};

const spacerData = dataAerobics.map((point) => ({ x: point.x, y: 5 }));

const ActivityGrowthBarChart = () => {
	return (
		<View
			style={{
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<VictoryChart
				width={width * 1}
				height={height * 0.32}
				theme={VictoryTheme.material}
				domainPadding={{ x: 20, y: 20 }}
				padding={{ left: 100, top: 30, right: 50, bottom: 50 }}
			>
				<VictoryAxis
					style={{
						axis: { stroke: "transparent" },
						ticks: { stroke: "transparent" },
						tickLabels: {
							fill: Colors.darkGray,
							fontSize: 10,
							paddingTop: 10,
							angle: -45,
							fontFamily: Font["poppins-regular"],
						},
						grid: { stroke: "transparent" },
					}}
				/>
				<VictoryAxis
					dependentAxis
					style={{
						axis: { stroke: "transparent" },
						ticks: { stroke: "transparent" },
						tickLabels: {
							fill: Colors.darkGray,
							fontSize: 10,
							paddingTop: 5,
							fontFamily: Font["poppins-regular"],
						},
					}}
					tickFormat={(tick) => `${tick}min`}
				/>
				<VictoryStack colorScale={[colors["aerobics"], colors["ballGames"], colors["strength"]]}>
					<VictoryBar data={dataAerobics} cornerRadius={{ top: 5, bottom: 5 }} barWidth={8} />
					<VictoryBar data={spacerData} style={{ data: { fill: "transparent" } }} />
					<VictoryBar data={dataBallGames} cornerRadius={{ top: 5, bottom: 5 }} barWidth={8} />
					<VictoryBar data={spacerData} style={{ data: { fill: "transparent" } }} />
					<VictoryBar data={dataStrength} cornerRadius={{ top: 5, bottom: 5 }} barWidth={8} />
				</VictoryStack>
			</VictoryChart>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<VictoryLegend
					x={width * 0.2}
					orientation="horizontal"
					gutter={20}
					rowGutter={{ top: -5, bottom: -10 }}
					style={{
						border: { stroke: "none" },
						title: { fontSize: 14 },
					}}
					centerTitle
					data={[
						{ name: "Aerobics", symbol: { fill: colors["aerobics"] } },
						{ name: "Ball games", symbol: { fill: colors["ballGames"] } },
						{ name: "Strength", symbol: { fill: colors["strength"] } },
					]}
				/>
			</View>
		</View>
	);
};

export default ActivityGrowthBarChart;
