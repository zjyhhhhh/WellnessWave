import {StyleSheet} from "react-native";
import FontSize from "../../constants/FontSize";

export const SingleCommentDisplayStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
    },
    text: {
      color: 'grey',
    },
    date: {
      paddingTop:3,
      fontSize: 10,
      color: 'grey',
    },
});

export const PostDetailScreenBottomBarStyles = StyleSheet.create({
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      backgroundColor: 'white',
    },
    input: {
      flex: 1,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: '#f2f2f2',
      marginRight: 10,
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 7,
    },
    numbers: {
      padding: 5,
      fontSize: FontSize.medium
    }
  });