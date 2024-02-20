import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { height, width } from "../../constants/Layout";
import { format, parseISO } from "date-fns";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import SidebarCategoryPicker from "../../components/SidebarCategoryPicker";
import FoodSelectRow from "../../components/FoodSelectRow";
import { FoodCategories, foodCategories } from "../../constants/FoodIcons";
import DishOrange from "../../assets/icons/DishOrange.svg";
import FoodDeleteRow from "../../components/FoodDeleteRow";
import { recordStyles as styles } from "./style";

type Props = NativeStackScreenProps<RecordStackParamList, "DietRecord">;

const categories = ["Common", "Fruits", "Drinks"];

const DietRecordScreen = ({ navigation, route }: Props) => {
	const { date, type } = route.params;
	const [category, setCategory] = useState("Common");
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [menu, setMenu] = useState(foodCategories["common"]);
	const [cartShown, setCartShown] = useState(false);

	const sendHandler = () => {
		navigation.navigate("Diet");
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
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{format(parseISO(date), "MMM d, yyyy")} - {type}
				</Text>
			</View>
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
								<FoodSelectRow
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
								<FoodDeleteRow
									iconName={food}
									key={food}
									deleteHandler={() => {
										const newSelectedItems = selectedItems.filter((item) => item !== food);
										setSelectedItems(newSelectedItems);
									}}
								/>
							))}
						</View>
					</ScrollView>
				</View>
			)}
			<View style={styles.bottomContainer}>
				<View style={styles.bottom}>
					<View>
						<TouchableOpacity onPress={() => setCartShown(!cartShown)}>
							<DishOrange height={0.15 * width} width={0.15 * width} />
						</TouchableOpacity>
						{selectedItems.length > 0 && (
							<View style={styles.bottomCount}>
								<Text style={styles.bottomCountText}>{selectedItems.length}</Text>
							</View>
						)}
					</View>
					<Text style={styles.cartTitle}>{type}</Text>
				</View>
				<TouchableOpacity style={styles.bottomButton} onPress={sendHandler}>
					<Text style={styles.bottomButtonText}>OK</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DietRecordScreen;
