import { View, Text, StyleSheet, Dimensions } from "react-native";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory-native";
import { height } from "../../../constants/Layout";
import Font from "../../../constants/Font";
import FontSize from "../../../constants/FontSize";

const { width } = Dimensions.get("window");
const data = [
	{ x: "Biking", y: 35 },
	{ x: "Running", y: 40 },
	{ x: "Pilates", y: 55 },
	{ x: "Yoga", y: 120 },
	{ x: "Swimming", y: 88 },
	{ x: "Dancing", y: 50 },
	{ x: "Others", y: 100 },
];

interface SportsTypePieChartProps {
	data: { x: string; y: number }[];
}

const SportsTypePieChart = ({ data }: SportsTypePieChartProps) => {
	return (
		<View>
			<VictoryPie
				width={width}
				height={height * 0.35}
				data={data}
				colorScale={["#BCB1E6", "#CF80D6", "#A8A9B7", "#8CD8EE", "#FFB1A1", "#93DCA7", "#F78585"]}
				innerRadius={(width * 0.4) / 2}
				labelComponent={
					<VictoryLabel
						angle={0}
						style={{
							fontSize: FontSize.small,
							fill: "black",
							fontFamily: Font["poppins-semiBold"],
						}}
					/>
				}
				padAngle={({ datum }) => 5}
				style={{ labels: { fill: "white", fontSize: 14 } }}
			/>
			<View style={styles.labelContainer}>
				<Text style={[styles.labelText, styles.labelText1]}>Total</Text>
				<Text style={[styles.labelText, styles.labelText2]}>7h 12min</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	labelContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	labelText: {
		position: "absolute",
		color: "black",
		fontSize: FontSize.xLarge,
		textAlign: "center",
		fontFamily: Font["poppins-semiBold"],
	},
	labelText1: {
		top: height * 0.13,
	},
	labelText2: {
		top: height * 0.17,
	},
});

export default SportsTypePieChart;
