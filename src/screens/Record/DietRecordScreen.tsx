import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecordStackParamList } from "../../../types";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { useEffect, useState } from "react";
import { height, width } from "../../constants/Layout";
import { format, parseISO } from "date-fns";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import FoodCategoryPicker from "../../components/FoodCategoryPicker";
import FoodSelectRow from "../../components/FoodSelectRow";
import { foodCategories } from "../../constants/FoodIcons";
import DishOrange from "../../assets/icons/DishOrange.svg";
import FontSize from "../../constants/FontSize";
import FoodDeleteRow from "../../components/FoodDeleteRow";

type Props = NativeStackScreenProps<RecordStackParamList, "DietRecord">;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		backgroundColor: "white",
		padding: 0.02 * width,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 2,
		borderBottomColor: Colors.gray,
	},
	headerText: {
		fontSize: 18,
		paddingVertical: 0.015 * width,
		fontFamily: Font["poppins-semiBold"],
	},
	searchBar: {
		backgroundColor: Colors.gray,
		height: 0.04 * height,
		borderRadius: 0.02 * height,
		marginHorizontal: 0.045 * width,
		marginVertical: 0.012 * height,
		paddingHorizontal: 0.04 * width,
		paddingVertical: 0.01 * height,
		flexDirection: "row",
		alignItems: "flex-start",
	},
	mainContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	sidebarContainer: {
		backgroundColor: Colors.secondary,
		width: "30%",
		height: " 100%",
		borderTopRightRadius: 0.06 * width,
	},
	foodCategoryPickerContainer: {
		height: "30%",
		marginTop: 0.03 * height,
	},
	foodContainer: {
		flex: 1,
		height: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		marginTop: 0.02 * height,
	},
	foodCategoryTitle: {
		fontSize: 18,
		fontFamily: Font["poppins-semiBold"],
		marginLeft: 0.04 * width,
		marginBottom: 0.01 * height,
	},
	cartContainer: {
		height: 0.08 * height,
		backgroundColor: Colors.background,
		borderTopWidth: 2,
		borderTopColor: Colors.gray,
		paddingLeft: 0.1 * width,
		paddingRight: 0.08 * width,
		marginBottom: 0.015 * height,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cart: {
		flexDirection: "row",
		alignContent: "flex-start",
		alignItems: "center",
	},
	cartCount: {
		position: "absolute",
		right: 0,
		top: 0,
		borderWidth: 2,
		borderColor: Colors.primary,
		borderRadius: 10,
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	cartCountText: {
		color: Colors.primary,
		fontFamily: Font["poppins-semiBold"],
	},
	cartTitle: {
		fontSize: FontSize.large,
		fontFamily: Font["poppins-semiBold"],
		paddingLeft: 0.05 * width,
	},
	cartButton: {
		width: "30%",
		height: "70%",
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 0.03 * width,
	},
	cartButtonText: {
		fontSize: FontSize.large,
		fontFamily: Font["poppins-semiBold"],
	},
});

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
		if (category === "Common") {
			setMenu(foodCategories["common"]);
		}
		if (category === "Fruits") {
			setMenu(foodCategories["fruits"]);
		}
		if (category === "Drinks") {
			setMenu(foodCategories["drink"]);
		}
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
					<View style={styles.foodCategoryPickerContainer}>
						{categories.map((cat) => (
							<FoodCategoryPicker
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
					<View style={styles.foodContainer}>
						<Text style={styles.foodCategoryTitle}>{category}</Text>
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
				<View
					style={{
						height: 0.2 * height,
						backgroundColor: Colors.background,

						paddingVertical: 0.02 * height,
						justifyContent: "flex-start",
						alignContent: "flex-start",
					}}
				>
					<Text
						style={{
							fontSize: FontSize.medium,
							fontFamily: Font["poppins-semiBold"],
							color: Colors.darkText,
							paddingHorizontal: 0.1 * width,
						}}
					>
						{selectedItems.length} records in all
					</Text>
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
			<View style={styles.cartContainer}>
				<View style={styles.cart}>
					<View>
						<TouchableOpacity onPress={() => setCartShown(!cartShown)}>
							<DishOrange height={0.15 * width} width={0.15 * width} />
						</TouchableOpacity>
						{selectedItems.length > 0 && (
							<View style={styles.cartCount}>
								<Text style={styles.cartCountText}>{selectedItems.length}</Text>
							</View>
						)}
					</View>
					<Text style={styles.cartTitle}>{type}</Text>
				</View>
				<TouchableOpacity style={styles.cartButton} onPress={sendHandler}>
					<Text style={styles.cartButtonText}>OK</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default DietRecordScreen;
