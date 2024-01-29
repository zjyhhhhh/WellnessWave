import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthenticationNavigator from "./src/navigation/AuthenticationNavigator";
import FlashMessage from "react-native-flash-message";
import { useFonts } from "expo-font";
import fonts from "./src/config/fonts";

export default function App() {
	const [fontsLoaded] = useFonts(fonts);
	return !fontsLoaded ? null : (
		<SafeAreaProvider>
			<AuthenticationNavigator />
			<StatusBar style="auto" backgroundColor="transparent" translucent={true} />
			<FlashMessage position="top" />
		</SafeAreaProvider>
	);
}
