import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { height, width } from "../../constants/Layout";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import SidebarCategoryPicker from "../../components/Record/RecordCart/SidebarCategoryPicker";
import DumbbellOrange from "../../assets/icons/DumbbellOrange.svg";
import { recordStyles as styles } from "./style";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import SportsIconComponent, {
	SportsCategories,
	sportsCategories,
} from "../../constants/SportsIcons";
import SportsDurationModal from "../../components/Record/RecordCart/SportsDurationModal";
import SelectRow from "../../components/Record/RecordCart/SelectRow";
import DeleteRow from "../../components/Record/RecordCart/DeleteRow";
import BottomContainer from "../../components/Record/RecordCart/BottomContainer";

type Props = NativeStackScreenProps<RecordStackParamList, "SportsRecord">;

const categories = ["Common", "Aerobics", "Ball games", "Strength"];

interface SportsRecord {
	name: string;
	duration: number;
}

const SportsRecordScreen = ({ navigation, route }: Props) => {
	const [category, setCategory] = useState("Common");
	const [selectedItems, setSelectedItems] = useState<SportsRecord[]>([]);
	const [menu, setMenu] = useState(sportsCategories["common"]);
	const [cartShown, setCartShown] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState("");

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	useEffect(() => {
		console.log(selectedDate);
	}, [selectedDate]);

	const sendHandler = () => {
		navigation.navigate("Sports");
	};

	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: {
				display: "none",
			},
		});
		return () =>
			navigation.getParent()?.setOptions({
				tabBarStyle: {
					position: "absolute",
					bottom: 0,
					right: 0,
					left: 0,
					elevation: 0,
					height: height * 0.1,
					backgroundColor: Colors.gray,
				},
			});
	}, [navigation]);

	useEffect(() => {
		setMenu(sportsCategories[category.replace(/\s+/g, "").toLowerCase() as keyof SportsCategories]);
	}, [category]);

	return (
		<SafeAreaView style={{ flex: 1, marginBottom: -34 }}>
			<DatePickerHeader
				onDateChange={(date: Date) => {
					setSelectedDate(date);
				}}
				backHandler={() => navigation.goBack()}
			/>
			<View>
				<View style={styles.searchBar}>
					<Feather name="search" size={18} color="black" />
					<TextInput style={{ flex: 1, marginLeft: 0.02 * width }} />
				</View>
			</View>
			<View style={styles.mainContainer}>
				<View style={styles.sidebarContainer}>
					<View style={styles.itemCategoryPickerContainer}>
						{categories.map((cat) => (
							<SidebarCategoryPicker
								category={cat}
								currentCategory={category}
								setCategory={setCategory}
								key={cat}
							/>
						))}
					</View>
				</View>
				<ScrollView
					style={{
						height: "100%",
					}}
				>
					<View style={styles.itemContainer}>
						<Text style={styles.itemCategoryTitle}>{category}</Text>
						<View style={{ width: "100%" }}>
							{menu.map((item) => (
								<SelectRow
									key={item}
									iconName={item}
									selected={selectedItems.some((i) => i.name === item) ? true : false}
									addHandler={() => {
										if (selectedItems.some((i) => i.name === item)) {
											const newSelectedItems = selectedItems.filter((i) => i.name !== item);
											setSelectedItems(newSelectedItems);
										} else {
											setModalVisible(true);
											setCurrentItem(item);
										}
									}}
									IconComponent={SportsIconComponent}
								/>
							))}
						</View>
					</View>
				</ScrollView>
				<SportsDurationModal
					modalVisible={modalVisible}
					setCloseModal={() => setModalVisible(false)}
					currentItem={currentItem}
					addHandler={(duration) => {
						if (selectedItems.some((i) => i.name === currentItem)) {
							const newSelectedItems = selectedItems.map((i) =>
								i.name === currentItem ? { name: currentItem, duration } : i
							);
							setSelectedItems(newSelectedItems);
						} else {
							setSelectedItems([...selectedItems, { name: currentItem, duration }]);
						}
						setModalVisible(false);
					}}
				/>
			</View>
			{cartShown && (
				<View style={styles.cart}>
					<Text style={styles.cartTitle}>{selectedItems.length} records in all</Text>
					<ScrollView>
						<View style={{ width: "100%" }}>
							{selectedItems.map((item) => (
								<DeleteRow
									iconName={item.name}
									key={item.name}
									duration={item.duration}
									editHandler={() => {
										setModalVisible(true);
										setCurrentItem(item.name);
									}}
									deleteHandler={() => {
										const newSelectedItems = selectedItems.filter((i) => i.name !== item.name);
										setSelectedItems(newSelectedItems);
									}}
									IconComponent={SportsIconComponent}
								/>
							))}
						</View>
					</ScrollView>
				</View>
			)}
			<BottomContainer
				iconComponent={<DumbbellOrange height={0.15 * width} width={0.15 * width} />}
				title="Sports"
				count={selectedItems.length}
				cartController={() => setCartShown(!cartShown)}
				buttonText="OK"
				sendHandler={sendHandler}
			/>
		</SafeAreaView>
	);
};

export default SportsRecordScreen;
