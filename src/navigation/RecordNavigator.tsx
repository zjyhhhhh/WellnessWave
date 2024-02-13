import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../types";
import HistoryScreen from "../screens/Record/HistoryScreen";
import DietScreen from "../screens/Record/DietScreen";

const Stack = createNativeStackNavigator<RecordStackParamList>();

const RecordNavigator = ({}) => {
	return (
		<Stack.Navigator initialRouteName="History" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="History" component={HistoryScreen} />
			<Stack.Screen name="Diet" component={DietScreen} />
		</Stack.Navigator>
	);
};

export default RecordNavigator;
