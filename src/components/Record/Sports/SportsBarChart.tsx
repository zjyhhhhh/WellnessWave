import { View, Text } from "react-native";
import ActivityGrowthBarChart from "./ActivityGrowthBarChart";
import { height, width } from "../../../constants/Layout";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import MyDonutChart from "./SportsTypePieChart";

const SportsBarChart = () => {
	return (
		<View
			style={{
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: height * 0.45,
				paddingHorizontal: width * 0.08,
				paddingVertical: height * 0.02,
			}}
		>
			<View
				style={{
					height: "100%",
					width: "100%",
					borderRadius: 20,
					shadowColor: "#000",
					backgroundColor: "#fffff8",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 4,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						paddingTop: "5%",
						paddingHorizontal: "10%",
					}}
				>
					<Text
						style={{
							zIndex: 100,
							color: "black",
							fontSize: FontSize.large,
							fontFamily: Font["poppins-semiBold"],
						}}
					>
						Activity Growth
					</Text>
				</View>
				<ActivityGrowthBarChart />
			</View>
			{/* <View>
				<MyDonutChart />
			</View> */}
		</View>
	);
};

export default SportsBarChart;
