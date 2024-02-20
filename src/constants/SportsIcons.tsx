import {
	FontAwesome5,
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome6,
	Ionicons,
} from "@expo/vector-icons";
import { View } from "react-native";

interface IconMap {
	[key: string]: (size: number) => JSX.Element;
}

export type SportsCategories = {
	common: string[];
	aerobics: string[];
	ballgames: string[];
	strength: string[];
};

export const sportsIcons: IconMap = {
	Walking: (size: number) => <FontAwesome5 name="walking" size={size} color="black" />,
	Running: (size: number) => <FontAwesome5 name="running" size={size} color="black" />,
	Swimming: (size: number) => <FontAwesome5 name="swimmer" size={size} color="black" />,
	Yoga: (size: number) => <MaterialCommunityIcons name="yoga" size={size} color="black" />,
	Hiking: (size: number) => <FontAwesome5 name="hiking" size={size} color="black" />,
	Biking: (size: number) => <FontAwesome5 name="biking" size={size} color="black" />,
	Dancing: (size: number) => (
		<MaterialCommunityIcons name="dance-ballroom" size={size} color="black" />
	),
	"Rope Jumping": (size: number) => (
		<MaterialCommunityIcons name="jump-rope" size={size} color="black" />
	),
	Gymnastics: (size: number) => (
		<MaterialIcons name="sports-gymnastics" size={size} color="black" />
	),
	Rowing: (size: number) => <MaterialIcons name="kayaking" size={size} color="black" />,
	Skiing: (size: number) => <FontAwesome5 name="skiing" size={size} color="black" />,
	"Climbing Stairs": (size: number) => <FontAwesome6 name="stairs" size={size} color="black" />,
	Skating: (size: number) => <FontAwesome5 name="skating" size={size} color="black" />,
	Baseball: (size: number) => <FontAwesome5 name="baseball-ball" size={size} color="black" />,
	Basketball: (size: number) => <FontAwesome5 name="basketball-ball" size={size} color="black" />,
	Football: (size: number) => <FontAwesome5 name="football-ball" size={size} color="black" />,
	Golf: (size: number) => <MaterialCommunityIcons name="golf" size={size} color="black" />,
	Handball: (size: number) => <MaterialCommunityIcons name="handball" size={size} color="black" />,
	Soccer: (size: number) => <FontAwesome5 name="futbol" size={size} color="black" />,
	Hockey: (size: number) => (
		<MaterialCommunityIcons name="hockey-sticks" size={size} color="black" />
	),
	Rugby: (size: number) => <MaterialCommunityIcons name="rugby" size={size} color="black" />,
	Volleyball: (size: number) => (
		<MaterialCommunityIcons name="volleyball" size={size} color="black" />
	),
	Tennis: (size: number) => <MaterialCommunityIcons name="tennis" size={size} color="black" />,
	Cricket: (size: number) => <MaterialCommunityIcons name="cricket" size={size} color="black" />,
	Badminton: (size: number) => (
		<MaterialCommunityIcons name="badminton" size={size} color="black" />
	),
	Boxing: (size: number) => (
		<MaterialCommunityIcons name="boxing-glove" size={size} color="black" />
	),
	Weightlifting: (size: number) => (
		<MaterialCommunityIcons name="weight-lifter" size={size} color="black" />
	),
	"Body Sculpt": (size: number) => (
		<MaterialCommunityIcons name="arm-flex" size={size} color="black" />
	),
	Restorative: (size: number) => (
		<FontAwesome5 name="hand-holding-heart" size={size} color="black" />
	),
	Plank: (size: number) => <FontAwesome5 name="hourglass-half" size={size} color="black" />,
	"20-20-20": (size: number) => <FontAwesome5 name="music" size={size} color="black" />,
	"Core Challenge": (size: number) => <Ionicons name="fitness" size={size} color="black" />,
};

export const sportsCategories: SportsCategories = {
	common: [
		"Walking",
		"Running",
		"Swimming",
		"Yoga",
		"Hiking",
		"Biking",
		"Dancing",
		"Rope Jumping",
		"Gymnastics",
		"Rowing",
		"Skiing",
		"Climbing Stairs",
		"Skating",
	],
	aerobics: [
		"Walking",
		"Running",
		"Swimming",
		"Yoga",
		"Hiking",
		"Biking",
		"Dancing",
		"Rope Jumping",
		"Gymnastics",
		"Rowing",
		"Skiing",
		"Climbing Stairs",
		"Skating",
	],
	ballgames: [
		"Baseball",
		"Basketball",
		"Football",
		"Golf",
		"Handball",
		"Soccer",
		"Hockey",
		"Rugby",
		"Volleyball",
		"Tennis",
		"Cricket",
		"Badminton",
	],
	strength: [
		"Boxing",
		"Weightlifting",
		"Body Sculpt",
		"Restorative",
		"Plank",
		"20-20-20",
		"Core Challenge",
	],
};

const IconComponent: React.FC<{ activity: string; iconSize: number }> = ({
	activity,
	iconSize,
}) => {
	const IconGenerator = sportsIcons[activity];
	const icon = IconGenerator ? IconGenerator(iconSize) : null;

	return (
		<View
			style={{
				height: iconSize,
				width: iconSize,
			}}
		>
			{icon}
		</View>
	);
};

export default IconComponent;
