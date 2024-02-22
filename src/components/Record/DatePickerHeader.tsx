import { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { height, width } from "../../constants/Layout";
import Colors from "../../constants/Colors";

interface DatePickerHeaderProps {
	value?: Date;
	onDateChange: (date: Date) => void;
}

const DatePickerHeader = ({ value, onDateChange }: DatePickerHeaderProps) => {
	const [date, setDate] = useState<Date>(value || new Date());

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		onDateChange(currentDate);
	};

	return (
		<SafeAreaView>
			<View
				style={{
					backgroundColor: "white",
					padding: 0.02 * width,
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					borderBottomWidth: 2,
					borderBottomColor: Colors.gray,
					height: 0.06 * height,
				}}
			>
				<DateTimePicker value={date} mode="date" onChange={onChange} display="default" />
			</View>
		</SafeAreaView>
	);
};

export default DatePickerHeader;
