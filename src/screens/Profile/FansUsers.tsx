import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity,Image} from "react-native";
import { ProfileStackParamList } from "../../../types";
import { Ionicons } from '@expo/vector-icons';
import Font from "../../constants/Font";
import { width } from "../../constants/Layout";
import React, { useState } from 'react';

type Props = NativeStackScreenProps<ProfileStackParamList, "FansUsers">;

const data = [
    { id: 1, name: 'Alice', avatar: require("../../assets/ProfileSample/img1.png"), description: "Variety is the spice of life.", follow: true},
    { id: 2, name: 'Bob', avatar: require("../../assets/ProfileSample/img2.png"), description: "The shortest way to do many things is to only one thing at a time.", follow: true},
    { id: 3, name: 'Arlene', avatar: require("../../assets/ProfileSample/img3.png"), description: "", follow: false},
    { id: 4, name: 'Dane', avatar: require("../../assets/ProfileSample/img4.png"), description: "", follow: true},
    { id: 5, name: 'Alex', avatar: require("../../assets/ProfileSample/img5.png"), description: "", follow: true},
    { id: 6, name: 'Awa', avatar: require("../../assets/ProfileSample/img6.png"), description: "Every man is a poet when he is in love.", follow: false},
    { id: 7, name: 'Cathy', avatar: require("../../assets/ProfileSample/img7.png"), description: "", follow: false},
    { id: 8, name: 'Abby', avatar: require("../../assets/ProfileSample/img8.png"), description: "", follow: true},
    { id: 9, name: 'Ashley', avatar: require("../../assets/ProfileSample/img9.png"), description: "", follow: true},
    { id: 10, name: 'Catherine', avatar: require("../../assets/ProfileSample/img10.png"), description: "Always remember that you are absolutely unique. Just like everyone else.", follow: false},
    { id: 11, name: 'Zoe', avatar: require("../../assets/ProfileSample/img11.png"), description: "", follow: true},
    { id: 12, name: 'David', avatar: require("../../assets/ProfileSample/img12.png"), description: "Challenges are what make life interesting and overcoming them is what makes life meaningful.", follow: true},
    { id: 13, name: 'Martin', avatar: require("../../assets/ProfileSample/img13.png"), description: "Genius only means hard-working all one's life.", follow: true},
    { id: 14, name: 'Michael', avatar: require("../../assets/ProfileSample/img14.png"), description: "", follow: false},
    { id: 15, name: 'Ada', avatar: require("../../assets/ProfileSample/img15.png"), description: "I am a slow walker, but I never walk backwards.", follow: true},
];

const fans_number = 15;


const FansUsersScreen = ({ navigation: { navigate } }: Props) => {
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
                <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <TouchableOpacity onPress={() => {navigate("FocusUsers");}}>
                            <Text style={styles.FocusText}>Focus</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.FansText}>Fans</Text>
                    </View>
                </View>
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

            
                <TextInput style={styles.searchinput}
                    placeholder= "Search"
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                />
                <View style={styles.MyfansContainer}>
                    <Text>My Fans ({fans_number})</Text>
                </View>
                    
                <FlatList
                    data={filteredFriends}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.block}>
                            <View style={styles.avatarContainer}>   

                                    <Image source={item.avatar} style={styles.avatar} />
                            </View>  
                            <View style={styles.InfoContainer}>
                                <Text style={styles.userNickname}>{item.name}</Text>
                                <Text style={styles.userDescription} numberOfLines = {1} ellipsizeMode="tail">{item.description}</Text>
                            </View>
                            <View style={styles.HeartContainer}>
                                <TouchableOpacity onPress={() => handlePress(item.id)}>
                                    {item.follow ? 
                                    (<Ionicons name="heart" size={30} color="orange" />) : 
                                    (<Ionicons name="heart-outline" size={30} color="orange" />
                                    )}
                                </TouchableOpacity>
                            </View>	          
                        </View>
                    )}
                />               
            </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
		flex: 1,
		alignItems: "center",
		justifyContent: 'flex-start',
		padding: 20
	},
    ReturnContainer: {
		position: 'absolute',
		top: 20,
		left: 20
	},
    headerContainer:{
		flexDirection: 'row',
		alignItems: 'flex-end',
        height: 50,
		padding: 5,
    	borderBottomWidth: 1,
    	borderBottomColor: '#ccc',
	},
    TextContainer:{
        width: 0.5 * width,
        alignItems: "center",
		justifyContent: 'flex-start',
    },
    FansText:{
        fontSize: 20,
		fontFamily: Font["poppins-semiBold"],
        color: "#5D5F5E"
    },
    FocusText:{
        fontSize: 20,
		fontFamily: Font["poppins-regular"],
        color: "#5D5F5E"
    },
    searchinput:{
        borderColor:"#E4E5E4",
        backgroundColor: "#E4E5E4",
        color: "#5D5F5E",
        borderRadius: 10,
        height: 40,
        width: 400,
        margin: 15,
        padding: 10,
    },
    MyfansContainer:{
        flexDirection: 'row',
		justifyContent:'flex-start',
        width: 400,
    },
    block:{
        flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
    },
    avatarContainer: {
		marginRight: 10,
	},
	avatar: {
		width: 0.15 * width,
		height: 0.15 * width,
		borderRadius: 0.12 * width,
	},
    InfoContainer: {
		width: 250,
	},
    HeartContainer:{
        width: 50,
        flexDirection: 'row',
		alignItems: 'center',
        justifyContent:'flex-end',
    },
	userNickname: {
		fontSize: 18,
		fontFamily: Font["poppins-semiBold"],
		color: "#5D5F5E",
	},
	userDescription:{
		fontSize: 13,
		fontFamily: Font["poppins-regular"],
		color: "#5D5F5E",
	},
});

export default FansUsersScreen;