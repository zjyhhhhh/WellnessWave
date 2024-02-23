import { StyleSheet, View, FlatList, Text, SafeAreaView, TouchableOpacity,Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../types";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Font from "../../constants/Font";
import { Ionicons } from '@expo/vector-icons';
import { width } from "../../constants/Layout";
import React, { useState } from 'react';


type Props = NativeStackScreenProps<ProfileStackParamList, "Notification">;

const Posts = {
	p1: require("../../assets/ProfileSample/p1.jpeg"),
	p2: require("../../assets/ProfileSample/p2.jpeg"),
	p3: require("../../assets/ProfileSample/p3.jpeg"),
	p4: require("../../assets/ProfileSample/p4.jpeg"),
	p5: require("../../assets/ProfileSample/p5.jpeg"),
	p6: require("../../assets/ProfileSample/p6.jpeg"),
	p7: require("../../assets/ProfileSample/p7.jpeg"),
	p8: require("../../assets/ProfileSample/p8.jpeg"),
	p9: require("../../assets/ProfileSample/p9.jpeg"),
	p10: require("../../assets/ProfileSample/p10.jpeg"),
};

const data = [
    { id: 1, name: 'Alice', avatar: require("../../assets/ProfileSample/img1.png"), action: "Liked your post", time: "13:08", post:Posts.p1, follow: true},
    { id: 2, name: 'Bob', avatar: require("../../assets/ProfileSample/img2.png"), action: "Liked your post.", time: "09:45", post:Posts.p1, follow: true},
    { id: 3, name: 'Arlene', avatar: require("../../assets/ProfileSample/img3.png"), action: "Disliked your post", time: "Sunday", post:Posts.p2, follow: false},
    { id: 4, name: 'Dane', avatar: require("../../assets/ProfileSample/img4.png"), action: "Liked your post", time: "Sunday", post:Posts.p3, follow: true},
    { id: 5, name: 'Alex', avatar: require("../../assets/ProfileSample/img5.png"), action: "Commented your post", time: "01-27", post:Posts.p4,follow: true},
    { id: 6, name: 'Awa', avatar: require("../../assets/ProfileSample/img6.png"), action: "Focus you", time: "01-26", post:"", follow: false},
    { id: 7, name: 'Cathy', avatar: require("../../assets/ProfileSample/img7.png"), action: "Disliked your post", time: "01-24", post:Posts.p5, follow: false},
    { id: 8, name: 'Abby', avatar: require("../../assets/ProfileSample/img8.png"), action: "Liked your post", time: "01-20", post:Posts.p5, follow: true},
    { id: 9, name: 'Ashley', avatar: require("../../assets/ProfileSample/img9.png"), action: "Liked your post", time: "01-11",post:Posts.p6, follow: true},
    { id: 10, name: 'Catherine', avatar: require("../../assets/ProfileSample/img10.png"), action: "Liked your post", time: "01-03", post:Posts.p7, follow: false},
    { id: 11, name: 'Zoe', avatar: require("../../assets/ProfileSample/img11.png"), action: "Focus you", time: "2023-12-31", post:"", follow: true},
    { id: 12, name: 'David', avatar: require("../../assets/ProfileSample/img12.png"), action: "Commented your post", time: "2023-12-31",post:Posts.p8, follow: true},
    { id: 13, name: 'Martin', avatar: require("../../assets/ProfileSample/img13.png"), action: "DisLiked your post", time: "2023-12-31",post:Posts.p8, follow: true},
    { id: 14, name: 'Michael', avatar: require("../../assets/ProfileSample/img14.png"), action: "Liked your post", time: "2023-12-30",post:Posts.p9, follow: false},
    { id: 15, name: 'Ada', avatar: require("../../assets/ProfileSample/img15.png"), action: "Liked your post", time: "2023-12-27",post:Posts.p10, follow: true},
];

const NotificationScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
	const [searchText, setSearchText] = useState('');
    const [friends, setFriends] = useState(data);

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().startsWith(searchText.toLowerCase())
    );
    const handlePress = (id: number) => {
        const updatedFriends = friends.map(friend =>
          friend.id === id ? { ...friend, follow: !friend.follow } : friend
        );
        setFriends(updatedFriends);
    };

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={styles.Title}>Notifcation</Text>
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
				<FlatList
					data={filteredFriends}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.block}>
                            <View style={styles.avatarContainer}>   
								<TouchableOpacity>
                                    <Image source={item.avatar} style={styles.avatar} />
								</TouchableOpacity>
                            </View>  
                            <View style={styles.InfoContainer}>
                                <Text style={styles.userNickname}>{item.name}</Text>
                                <Text style={styles.userAction}>{item.action}  {item.time}</Text>
                            </View>
                            <View style={styles.postContainer}>
								{item.post != "" ? 
								(<TouchableOpacity>
									<Image source={item.post} style={styles.post} />
								</TouchableOpacity>) : 
								(<TouchableOpacity onPress={() => handlePress(item.id)}>
									{item.follow ? 
                                    (<View style={styles.FollowedContainer}>
										<Text style={styles.FollowedText}>Followed</Text>
									 </View>) : 
                                    (<View style={styles.UnFollowedContainer}>
										<Text style={styles.UnFollowedText}>Follow</Text>
									 </View>
                                    )}
								</TouchableOpacity>
								)}
                            </View>	          
                        </View>
                    )}
                />     
			</View>
		</SafeAreaView>
	);
};




export default NotificationScreen;



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

	block:{
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
    	borderBottomWidth: 0.5,
    	borderBottomColor: '#ccc',
	},
	avatarContainer: {
		marginRight: 10,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 0.12 * width,
	},
	InfoContainer: {
		width: 230,
	},
	userNickname: {
		fontSize: 14,
		fontFamily: Font["poppins-semiBold"],
		color: Colors.darkGray,
	},
	userAction:{
		fontSize: 11,
		fontFamily: Font["poppins-regular"],
		color: Colors.darkGray,
	},
	postContainer:{
		marginTop: 0,
		marginRight: 0,
	},
	post:{
		width: 60,
		height: 60,
		borderRadius: 5,
	},
	UnFollowedContainer: {
		alignItems: 'center',
		backgroundColor: 'orange',
		borderRadius: 20,
		paddingVertical: 4,
    	paddingHorizontal: 7,
		width: 60
	},
	FollowedContainer: {
		alignItems: 'center',
		borderColor: 'dimgrey',
		borderWidth: 1,
		borderRadius: 20,
		paddingVertical: 4,
    	paddingHorizontal: 7,
		width: 60
	},
	FollowedText:{
		fontSize: 9.5,
		fontFamily: Font["poppins-semiBold"],
		color: "dimgrey",
	},
	UnFollowedText:{
		fontSize: 11,
		fontFamily: Font["poppins-semiBold"],
		color: "white",
	},
});
