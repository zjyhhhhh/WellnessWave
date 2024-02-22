import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {View, SafeAreaView, TouchableOpacity, Image, Text, ScrollView} from 'react-native';
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
//navigation import 
import { MomentStackParamList } from '../../../types';
import SingleCommentDisplay from "../../components/FeedScreenComponent/SingleCommentDisplay";
import PostDetailScreenBottomBar from "../../components/FeedScreenComponent/PostDetailScreenBottomBar";
import {useEffect} from "react";
import { height } from "../../constants/Layout";
import { PostDetailScreenStyle as StyleContainer } from "./styles";

type Props = NativeStackScreenProps<MomentStackParamList, "PostDetailScreen">;

const PostDetailScreen=({navigation}: Props) => {
    const [commentCount, setCommentCount] = useState(3);

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
    const postInfo = 
    {
        posterName : "Ashley",
        postPersonImage : require("../../assets/FeedsSample/avatar1.jpg"), 
        postImage : require("../../assets/FeedsSample/post1.jpg"),
        postText : "Amidst the vast and desolate desert landscape, a woman in a maroon activewear demonstrates an impressive yoga pose on the edge of a rocky outcrop. Her posture is graceful and robust, with one arm extended forward, parallel to the earth, while the other gently grasps her heel, showcasing a dynamic balance and control. Her hair billows in the wind, and her whole stance resonates with the grandeur of the undulating mountains and the expansive sky behind her, capturing a moment of serene harmony with nature.",
        likes : 72,
        isLiked : false,
        dislikes: 3,
        isDisliked : false,
        date: '2023-11-23'
    };

	return (
        <SafeAreaView style={{flex:1, backgroundColor: "white"}}>
            <View style={StyleContainer.Headers}>
                <TouchableOpacity style={StyleContainer.backButton} onPress={navigation.goBack}>
                    <AntDesign name="left" size={24} color="black"/>
                </TouchableOpacity>
                <Image source={postInfo.postPersonImage} style={StyleContainer.portraitStyle}/>
                <Text style={StyleContainer.posterNameStyle}>{postInfo.posterName}</Text>
                <TouchableOpacity style={StyleContainer.followButtonStyle}>
                    <Text style={StyleContainer.followButtonTextStyle}>Follow</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{backgroundColor:Colors.background}}>
                <View style={StyleContainer.imageStyle}>
                    <Image source={postInfo.postImage} style={{width:"100%", height:430}} />
                </View>
                <View style={{paddingHorizontal: 5, paddingVertical:10 }}>
                    <Text style={{fontSize: FontSize.small}}> {postInfo.postText}</Text>
                </View>
                <Text style={StyleContainer.postDateStyle}> {postInfo.date}</Text>
                <View style={StyleContainer.separator}></View>
                <Text style={StyleContainer.commentCountStyle}> All {commentCount} Comments</Text>
                <View>
                    <SingleCommentDisplay 
                        username="JackieChen"
                        avatar="../../assets/FeedsSample/avatar2.jpg"
                        text="Such an wonderful post. Can't wait to go there and experience the beauty of nature."
                        date="2023-12-31"
                    />
                </View>
            </ScrollView>
            <PostDetailScreenBottomBar/>
        </SafeAreaView>
    );
};

export default PostDetailScreen;