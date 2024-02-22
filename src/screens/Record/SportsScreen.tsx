import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView, View, Text } from "react-native";
import { RecordStackParamList } from "../../../types";
import { height, width } from "../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";
import ActivityGrowthBarChart from "../../components/Record/Sports/ActivityGrowthBarChart";
import SportsTypePieChart from "../../components/Record/Sports/SportsTypePieChart";
import { sportsScreenStyles as styles } from "./style";

type Props = NativeStackScreenProps<RecordStackParamList, "Sports">;

const iconSize = 0.06 * width;
const SportsScreen = ({ navigation: { navigate } }: Props) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.header}>
				<AntDesign
					name="arrowleft"
					size={iconSize}
					color="black"
					onPress={() => {
						navigate("History");
					}}
				/>
				<AntDesign
					name="plus"
					size={iconSize}
					color="black"
					onPress={() => {
						navigate("SportsRecord");
					}}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<View style={styles.bodyContainer}>
					<View style={styles.growthContainer}>
						<View style={styles.growthTitleContainer}>
							<Text style={styles.growthTitle}>Activity Growth</Text>
						</View>
						<ActivityGrowthBarChart />
					</View>
					<View style={{ flex: 1 }}>
						<SportsTypePieChart />
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SportsScreen;
