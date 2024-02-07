import Ionic from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import {Image, SafeAreaView, ScrollView, View, Text, TouchableOpacity, } from "react-native";
import  {AntDesign} from '@expo/vector-icons';
import Spacing from "../constants/Spacing";
import ThumbsButton from "../components/ThumbsButton";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";

const AllFeedScreen = ({}) => {
	const postInfo = [
		{
			postTitle : "Ashley",
			postPersonImage : require("../assets/FeedsSample/avatar1.jpg"), 
			postImage : require("../assets/FeedsSample/post1.jpg"),
			postText : "Doin outdoor yoga #fitness #chill #mountain",
			likes : 72,
			isLiked : false,
			dislikes: 3,
			isDisliked : false,
		},
		{
			postTitle : "JohnStrong",
			postPersonImage : require("../assets/FeedsSample/avatar2.jpg"), 
			postImage : require("../assets/FeedsSample/post2.jpg"),
			postText : "Fresh new day for chest #workout #gym #chestday",
			likes : 51,
			isLiked : false,
			dislikes: 6,
			isDisliked : false,
		},
		{
			postTitle : "FeelingNatural",
			postPersonImage : require("../assets/FeedsSample/avatar3.jpg"), 
			postImage : require("../assets/FeedsSample/post3.jpg"),
			postText : "Ready to Jump #run #sports",
			likes : 121,
			isLiked : false,
			dislikes: 13,
			isDisliked : false,
		}
	]
	return (
		<ScrollView style={{ paddingHorizontal: 10, paddingTop: 10 }}>
			<SafeAreaView >
				{
					postInfo.map( (data, index) => {
						const [like, setLike] = useState(data.isLiked);
						const [dislike, setDislike] = useState(data.isDisliked);
						const [postData, setPostData] = useState(data);
						const [likes, setLikes] = useState(data.likes); // number of likes
						const [dislikes, setDislikes] = useState(data.dislikes);	// number of dislikes	
						return (
							<View key = {index} 
								style={{
									paddingBottom : 10,
									borderBottomColor : "gray",
									borderBottomWidth : 0.1,
									// border
									marginBottom: 12,  
									borderWidth: 1,  
									borderColor: "#ddd",  
									borderRadius: 10,  
									backgroundColor: '#FAFAFA', 
									overflow: 'hidden',  
									// shadow
									shadowColor: "#000",  
									shadowOffset: {
										width: 0,  
										height: -4,  
									},
									shadowOpacity: 0.3,  
									shadowRadius: 5,  
									elevation: 8,  
								}}>
								<View style={{
									flexDirection : 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: 15
								}}>
									<View style={{flexDirection:"row", alignItems:"center"}}>
                                        {/* portion of displying the person's portrait */}
										<Image 
											source = {data.postPersonImage}
											style = {{width:40, height:40, borderRadius:100}} 
                                            testID={`postPersonImage-${index}`}
										/>
                                        {/* portion of displying the person's portrait */}
										<View style={{paddingLeft: 10}}>
											<Text style={{fontSize:15, fontWeight:'bold', fontFamily:Font["poppins-bold"]}}>{data.postTitle}</Text>
										</View>
									</View>
									<TouchableOpacity
										style={{
											paddingVertical: Spacing * 0.5,
											paddingHorizontal: Spacing,
											minWidth: 80,
											minHeight: 35,
											borderRadius: Spacing,
											shadowColor: "#000000", 
											shadowOffset: {
												width: 0,
												height: 2,  
											},
											shadowOpacity: 0.2,  
											shadowRadius: 4,  
											backgroundColor: Colors.primary,
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Text
											style={{
												fontFamily: Font["poppins-bold"],
												color: Colors.gray,
												fontSize: FontSize.small,
												textAlign: "center",
											}}
										>
											Follow
										</Text>
									</TouchableOpacity>
								</View>
								
								<View 
									style={{
										position:'relative',
										justifyContent:'center',
										alignItems:'center',
									}}>
                                    {/* portion of displaying the image user posted */}
									<Image source={data.postImage} 
                                           style={{width:"100%", height:400}} 
                                           testID={`postImage-${index}`}
                                    />
                                    {/* portion of displaying the image user posted */}
								</View>

								<View style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingHorizontal: 12,
									paddingTop: 10,
								}}>
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
										<Text style={{
											paddingRight: 10, 
											fontWeight: 'bold',
											}}>
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
										<Text style={{
											paddingRight: 10, 
											fontWeight: 'bold',
											}}>
											{dislikes}
										</Text>
										{/* Code for handling Comment  button */}
										<TouchableOpacity>
											<Ionic 
												name = 'chatbox-ellipses-outline'
												style = {{fontSize:20, paddingRight:10}}
											/>
										</TouchableOpacity>
									</View>
								</View>
								
								{/* Code for handling post text  button */}
								<View style={{ 
									paddingHorizontal: 12,
									paddingVertical: 3,
								}}>
									<Text style={{
										fontWeight:'700',
										fontSize:15,
										paddingVertical: 2,
										}}
									>
										{postData.postText}
									</Text>
									<TouchableOpacity>
										<Text style={{opacity:0.4, paddingVertical:2}}>
											View all Comments
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						)
					})
				}
			</SafeAreaView>
		</ScrollView>
	); 
}; 

export default AllFeedScreen;