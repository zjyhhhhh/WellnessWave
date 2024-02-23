import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../types";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { height, width } from "../../constants/Layout";
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = NativeStackScreenProps<ProfileStackParamList, "Edit">;

const avatarPath = require("../../assets/images/avatar.jpg");

const EditScreen:React.FC<Props> = ({ navigation: { navigate } }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={styles.Title}>Edit Profile</Text>
				<View style={styles.ReturnContainer}>
					<Ionicons
						name="arrow-back"
						size={28}
							color="dimgray"
							onPress={() => {
							navigate("Main");
						}}
					/>
				</View>
				<View style={styles.avatarContainer}>
					<TouchableOpacity onPress={() => {}}>
						<Image source={avatarPath} style={styles.avatar} />
					</TouchableOpacity>
				</View>	
				
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Name</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}>Yahh</Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>User name</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}>123456789</Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Brief description</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Birthday</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}>2000-01-01</Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Gender</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}>Female</Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Area</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}>Canada</Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Profession</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Background image</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.MoreInfoContianer}>
					<Text style={styles.MoreInfoText}>More info</Text>
					<Text style={styles.PrivateText}> (Private)</Text>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Information</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>QR code</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				<View style={styles.block}>
					<View style = {styles.ClassficationContainer}>
						<Text style = {styles.ClassficationText}>Level</Text>
					</View>
					<View style = {styles.InfoContainer}>
						<Text style = {styles.InfoText}> </Text>
					</View>
					<View style = {styles.IconContianer}>
						<Icon
							name="chevron-right"
							size={10}
							color="dimgray"
							onPress={() =>{navigate("Main");}}
						/>
					</View>
				</View>
				
			</View>
		</SafeAreaView>
	);
};

export default EditScreen;

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems: "center",
		justifyContent: 'flex-start',
		padding: 20
	},
	Title: {
		fontSize: FontSize.xxLarge,
		fontFamily: Font["poppins-semiBold"],
		color: "orange",
	},
	ReturnContainer: {
		position: 'absolute',
		top: 20,
		left: 20
	},
	avatarContainer: {
		justifyContent: 'center',
		alignItems: "center",
		padding: 15
	},
	avatar: {
		width: 0.27 * width,
		height: 0.27 * width,
		borderRadius: 0.5 * width,
	},
	block:{
		flexDirection: 'row',
		padding: 3,
		alignItems: 'flex-end',
    	borderBottomWidth: 0.5,
    	borderBottomColor: '#ccc',
		height: 35
	},
	ClassficationContainer: {
		width: 200,
		flexDirection: 'row',
		justifyContent:'flex-start'
	},
	ClassficationText: {
		fontSize: 15,
		fontFamily: Font["poppins-regular"],
		color: Colors.darkGray,
	},
	InfoContainer: {
		width: 150,
		flexDirection: 'row',
		justifyContent:'flex-end'
	},
	InfoText: {
		fontSize: 13,
		fontFamily: Font["poppins-regular"],
		color: Colors.darkGray,
	},
	IconContianer: {
		width: 20,
		height: 15,
		alignItems: 'flex-end'
	},
	MoreInfoContianer: {
		padding: 20,
		width: 410,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end'
	},
	MoreInfoText: {
		fontSize: 20, 
		fontFamily: Font["poppins-semiBold"],
		color: Colors.darkGray,
	},
	PrivateText: {
		fontSize: 18,
		fontFamily: Font["poppins-regular"],
		color: Colors.darkGray
	}
});
