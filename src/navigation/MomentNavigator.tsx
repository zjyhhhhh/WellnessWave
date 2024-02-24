import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MomentStackParamList } from "../../types";
import FeedScreen from "../screens/FeedScreen";
import SearchScreen from "../screens/SearchScreen";
import PostImageScreen from "../screens/PostImageScreen";
import PostDetailScreen from "../screens/FeedScreen/PostDetailScreen";

const Stack = createNativeStackNavigator<MomentStackParamList>();

const MomentNavigator = ({}) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Feed" component={FeedScreen} />
			<Stack.Screen name="Search" component={SearchScreen} />
			
			<Stack.Screen name="PostImageScreen" component={PostImageScreen} />
			<Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
		</Stack.Navigator>
	);
};

export default MomentNavigator;
