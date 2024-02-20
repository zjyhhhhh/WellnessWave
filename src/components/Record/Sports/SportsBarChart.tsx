import { BarChart } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const data = {
	labels: ["Jan 9", "Jan 30", "Jan 31", "Feb 1", "Feb 2", "Feb 3", "Feb 4"],
	datasets: [
		{
			data: [45, 30, 80, 81, 56, 55, 40],
			color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
			label: "Aerobics",
		},
		{
			data: [30, 70, 45, 60, 75, 60, 70],
			color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // optional
			label: "Anaerobic",
		},
	],
};

const chartConfig = {
	backgroundColor: "#ffffff",
	backgroundGradientFrom: "#ffffff",
	backgroundGradientTo: "#ffffff",
	decimalPlaces: 0, // optional, defaults to 2dp
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	style: {
		borderRadius: 16,
		paddingVertical: 10,
	},
	propsForDots: {
		r: "0", // this will hide the dots
	},
	propsForBackgroundLines: {
		stroke: "#e3e3e3", // this will set the color of the background lines
		strokeDasharray: "", // this will make the background lines solid
	},
	barRadius: 5, // this will add the rounded corners
	fillShadowGradient: "#787878", // color of the bars
	fillShadowGradientOpacity: 1,
};

const SportsBarChart = () => {
	return (
		<View>
			<BarChart
				data={data}
				width={screenWidth}
				height={220}
				yAxisLabel="%"
				yAxisSuffix="k"
				chartConfig={chartConfig}
				verticalLabelRotation={30}
				fromZero={true}
				showBarTops={false}
				withInnerLines={false}
			/>
		</View>
	);
};

export default SportsBarChart;
