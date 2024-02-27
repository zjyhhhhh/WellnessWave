import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { height, width } from "../../constants/Layout";
import { format, parseISO } from "date-fns";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import SidebarCategoryPicker from "../../components/Record/RecordCart/SidebarCategoryPicker";
import FoodIconComponent, { FoodCategories, foodCategories } from "../../constants/FoodIcons";
import DishOrange from "../../assets/icons/DishOrange.svg";
import { recordStyles as styles } from "./style";
import SelectRow from "../../components/Record/RecordCart/SelectRow";
import DeleteRow from "../../components/Record/RecordCart/DeleteRow";
import BottomContainer from "../../components/Record/RecordCart/BottomContainer";
import DatePickerHeader from "../../components/Record/DatePickerHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RecordStackParamList, "DietRecord">;

const categories = ["Common", "Fruits", "Drinks"];

const getUserInfo = async () => {
	const userToken = await AsyncStorage.getItem("userToken");
	const username = await AsyncStorage.getItem("username");
	return { userToken, username };
};

const DietRecordScreen = ({ navigation, route }: Props) => {
	const { date, type } = route.params;
	const [category, setCategory] = useState("Common");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [menu, setMenu] = useState(foodCategories["common"]);
	const [cartShown, setCartShown] = useState(false);

	const sendHandler = async () => {
		const { userToken, username } = await getUserInfo();

		try {
			const response = await fetch(`http://3.17.14.65:8000/post_user_diet/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${userToken}`,
				},
				body: JSON.stringify({
					log_date: date,
					username: username,
					diets: {
						[type.toLowerCase()]: selectedItems,
					},
				}),
			});

			if (response.ok) {
				navigation.goBack();
			} else {
				console.error("Failed to post data");
			}
		} catch (error) {
			console.error("Network error:", error);
		}
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
		setMenu(foodCategories[category.toLowerCase() as keyof FoodCategories]);
	}, [category]);

	return (
		<SafeAreaView style={{ flex: 1, marginBottom: -34 }}>
			<DatePickerHeader
				title={`${date.split("T")[0]} - ${type}`}
				backHandler={() => navigation.goBack()}
			></DatePickerHeader>
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
							{menu.map((food) => (
								<SelectRow
									key={food}
									iconName={food}
									selected={selectedItems.includes(food) ? true : false}
									addHandler={() => {
										if (selectedItems.includes(food)) {
											const newSelectedItems = selectedItems.filter((item) => item !== food);
											setSelectedItems(newSelectedItems);
										} else {
											setSelectedItems([...selectedItems, food]);
										}
									}}
									IconComponent={FoodIconComponent}
								/>
							))}
						</View>
					</View>
				</ScrollView>
			</View>
			{cartShown && (
				<View style={styles.cart}>
					<Text style={styles.cartTitle}>{selectedItems.length} records in all</Text>
					<ScrollView>
						<View style={{ width: "100%" }}>
							{selectedItems.map((food) => (
								<DeleteRow
									iconName={food}
									key={food}
									deleteHandler={() => {
										const newSelectedItems = selectedItems.filter((item) => item !== food);
										setSelectedItems(newSelectedItems);
									}}
									IconComponent={FoodIconComponent}
								/>
							))}
						</View>
					</ScrollView>
				</View>
			)}
			<BottomContainer
				iconComponent={<DishOrange height={0.15 * width} width={0.15 * width} />}
				title={type}
				count={selectedItems.length}
				cartController={() => setCartShown(!cartShown)}
				buttonText="OK"
				sendHandler={sendHandler}
			/>
		</SafeAreaView>
	);
};

export default DietRecordScreen;
