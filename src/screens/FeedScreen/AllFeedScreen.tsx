import Ionic from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import {Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import  {AntDesign, Ionicons} from '@expo/vector-icons';
import ThumbsButton from "../../components/ThumbsButton";
import Colors from "../../constants/Colors";
import PostImageButton from "../../components/FeedScreenComponent/PostImageButton";
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MomentStackParamList, RootStackParamList } from '../../../types';
import { AllFeedScreenStyle } from "./styles";


const AllFeedScreen = ({}) => {
    const navigation = useNavigation<NativeStackNavigationProp<MomentStackParamList>>();
    const navigateToPostDetail = () => {
        navigation.navigate('PostDetailScreen',{});
    };

	const postInfo = [
		{
			postTitle : "Ashley",
			postPersonImage : require("../../assets/FeedsSample/avatar1.jpg"), 
			postImage : require("../../assets/FeedsSample/post1.jpg"),
			postText : "Doin outdoor yoga #fitness #chill #mountain",
			likes : 72,
			isLiked : false,
			dislikes: 3,
			isDisliked : false,
		},
		{
			postTitle : "JohnStrong",
			postPersonImage : require("../../assets/FeedsSample/avatar2.jpg"), 
			postImage : require("../../assets/FeedsSample/post2.jpg"),
			postText : "Fresh new day for chest #workout #gym #chestday",
			likes : 51,
			isLiked : false,
			dislikes: 6,
			isDisliked : false,
		},
		{
			postTitle : "FeelingNatural",
			postPersonImage : require("../../assets/FeedsSample/avatar3.jpg"), 
			postImage : require("../../assets/FeedsSample/post3.jpg"),
			postText : "Ready to Jump #run #sports",
			likes : 121,
			isLiked : false,
			dislikes: 13,
			isDisliked : false,
		}
	]
	return (
        <View style={{flex:1}}>
            <ScrollView style={AllFeedScreenStyle.container}>
                <SafeAreaView >
                    {
                        postInfo.map( (data, index) => {
                            const [like, setLike] = useState(data.isLiked);
                            const [dislike, setDislike] = useState(data.isDisliked);
                            const [postData, setPostData] = useState(data);
                            const [likes, setLikes] = useState(data.likes); // number of likes
                            const [dislikes, setDislikes] = useState(data.dislikes);	// number of dislikes
                            
                            return (
                                <TouchableOpacity
                                    onPress={navigateToPostDetail}
                                    activeOpacity={1}
                                    style={[
                                        AllFeedScreenStyle.eachPostStyle,
                                    ]}
                                    key={index}
                                >
                                    <View key = {index} style={AllFeedScreenStyle.eachPostStyle}>
                                        <View style={AllFeedScreenStyle.topHeader}>
                                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                                {/* portion of displying the person's portrait */}
                                                <Image 
                                                    source = {data.postPersonImage}
                                                    style = {AllFeedScreenStyle.userPortraitImage} 
                                                    testID={`postPersonImage-${index}`}
                                                />
                                                {/* portion of displying the person's name*/}
                                                <View style={{paddingLeft: 10}}>
                                                    <Text style={AllFeedScreenStyle.usersNameStyle}>{data.postTitle}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={AllFeedScreenStyle.followButton}>
                                                <Text style={AllFeedScreenStyle.followButtonText}>Follow</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                        <View style={AllFeedScreenStyle.postedImageView}>
                                            <Image source={data.postImage} 
                                                style={AllFeedScreenStyle.postedImageLayout} 
                                                testID={`postImage-${index}`}
                                            />
                                        </View>

                                        <View style={AllFeedScreenStyle.buttonContainer}>
                                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                                {/* Code for handling Thumbs Up button */}
                                                <ThumbsButton 
                                                    like = {like}
                                                    setLike = {setLike}
                                                    dislike = {dislike}
                                                    setDislike = {setDislike}

                                                    likeCount = {likes}
                                                    setLikeCount = {setLikes}
                                                    dislikeCount= {dislikes}
                                                    setDislikeCount= {setDislikes} 
                                                    icon = {
                                                        <AntDesign 
                                                            name = {like ? "like1" : "like2" }
                                                            size = {20}
                                                            color = "black"
                                                            style={{
                                                                paddingRight:10,
                                                                fontSize:20,
                                                                color: like ? Colors.primary : 'black',
                                                            }}
                                                        />
                                                    }
                                                    testID = {`testThumbUpButton-${index}`}
                                                />
                                                <Text style={AllFeedScreenStyle.likeDislikeNumbers}>
                                                    {likes}
                                                </Text>
                                                {/* Code for handling Thumbs Down button */}
                                                <ThumbsButton 
                                                    like = {dislike}
                                                    setLike = {setDislike}
                                                    dislike = {like}
                                                    setDislike = {setLike}

                                                    likeCount = {dislikes}
                                                    setLikeCount = {setDislikes}
                                                    dislikeCount= {likes}
                                                    setDislikeCount= {setLikes} 

                                                    icon = {
                                                        <AntDesign 
                                                            name = {dislike ? "dislike1" : "dislike2" }
                                                            size = {20}
                                                            color = "black"
                                                            style={{
                                                                paddingRight:10,
                                                                fontSize:20,
                                                                color: dislike ? 'red' : 'black',
                                                            }}
                                                        />
                                                    }
                                                    testID = {`testThumbDownButton-${index}`}
                                                />
                                                <Text style={AllFeedScreenStyle.likeDislikeNumbers}>
                                                    {dislikes}
                                                </Text>
                                                {/* Code for handling Comment  button */}
                                                <TouchableOpacity>
                                                    <Ionic 
                                                        name = 'chatbox-ellipses-outline'
                                                        style = {AllFeedScreenStyle.commentButton}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {/* Code for handling post text  button */}
                                        <View style={AllFeedScreenStyle.postTextContainer}>
                                            <Text style={AllFeedScreenStyle.postTextStyle}>
                                                {postData.postText}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </SafeAreaView>
            </ScrollView>
            <PostImageButton />
        </View>
	); 
}; 

export default AllFeedScreen;