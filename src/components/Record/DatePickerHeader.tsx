import { useState } from "react";
import { View, SafeAreaView, Pressable, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { height, width } from "../../constants/Layout";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";

interface DatePickerHeaderProps {
	value?: Date;
	onDateChange?: (date: Date) => void;
	backHandler?: () => void;
	addHandler?: () => void;
	title?: string;
}

const DatePickerHeader = ({
	value,
	onDateChange,
	backHandler,
	addHandler,
	title,
}: DatePickerHeaderProps) => {
	const [date, setDate] = useState<Date>(value || new Date());

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		onDateChange?.(currentDate);
	};

	return (
		<SafeAreaView>
			<View
				style={{
					backgroundColor: "white",
					padding: 0.02 * width,
					flexDirection: "row",
					justifyContent: "space-between",
					alignContent: "center",
					borderBottomWidth: 2,
					borderBottomColor: Colors.gray,
					height: 0.06 * height,
				}}
			>
				<Pressable
					style={{
						padding: 0.02 * width,
					}}
					onPress={backHandler}
				>
					<AntDesign
						name="arrowleft"
						size={0.06 * width}
						color={backHandler ? "black" : "transparent"}
					/>
				</Pressable>
				{onDateChange && (
					<DateTimePicker value={date} mode="date" onChange={onChange} display="default" />
				)}
				{title && (
					<Text
						style={{
							fontSize: 18,
							paddingVertical: 0.015 * width,
							fontFamily: Font["poppins-semiBold"],
						}}
					>
						{title}
					</Text>
				)}
				<Pressable
					style={{
						padding: 0.02 * width,
					}}
					onPress={addHandler}
				>
					<AntDesign name="plus" size={0.06 * width} color={addHandler ? "black" : "transparent"} />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default DatePickerHeader;
