import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { PostDetailScreenBottomBarStyles as styles } from './styles';


const PostDetailScreenBottomBar: React.FC = () => {
  return (
    <View style={styles.bottomContainer}>
      <TextInput
        style={styles.input}
        placeholder="Say Something..."
        placeholderTextColor="grey"
      />
      <TouchableOpacity style={styles.iconButton}>
        <AntDesign name="like2" size={24} color="black" />  
        <Text style={styles.numbers}>47</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <AntDesign name="dislike2" size={24} color="black" />
        <Text style={styles.numbers}>23</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
        <Text style={styles.numbers}>6</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostDetailScreenBottomBar;
