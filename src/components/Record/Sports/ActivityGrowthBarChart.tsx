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

interface ActivityGrowthBarChartProps {
	dataAerobics: DataItem[];
	dataBallGames: DataItem[];
	dataStrength: DataItem[];
}

const colors = {
	aerobics: "#CA6B6E",
	ballGames: "#47898F",
	strength: "#D08627",
};

const ActivityGrowthBarChart = ({
	dataAerobics,
	dataBallGames,
	dataStrength,
}: ActivityGrowthBarChartProps) => {
	const spacerData = /* istanbul ignore next */ dataAerobics.map((point) => ({ x: point.x, y: point.y === 0 ? 0 : 2 }));

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
					tickFormat={(tick) => /* istanbul ignore next */ `${tick}min`}
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
