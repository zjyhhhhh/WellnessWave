import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthenticationNavigator from "./src/navigation/AuthenticationNavigator";

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthenticationNavigator />
			<StatusBar style="auto" backgroundColor="transparent" translucent={true} />
		</SafeAreaProvider>
	);
}
