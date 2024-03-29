import { AntDesign } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MomentStackParamList, RootStackParamList } from '../../../types';

const PostImageButtonStyle = StyleSheet.create({
    container: {
        zIndex: 100,
        position: 'absolute', 
        right: 30, 
        bottom: 120, 
        width: 50, 
        height: 50,
    },
});

const PostImageButton = () => {

	const [image, setImage] = useState(null);
	const [photoURIs, setPhotoURIs] = useState<string[]>([]);
	const navigation = useNavigation<NativeStackNavigationProp<MomentStackParamList>>();

	const pickImage = async () => {

		var result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsMultipleSelection: true,
			aspect: [4,3],
			quality: 1,
			base64: true,
		});

		if (!result.canceled && result.assets && result.assets.length > 0)
		{
			
			const selectedPhotoURIs = result.assets.map(asset => asset.base64).filter((base64): base64 is string => base64 !== undefined);
			if (selectedPhotoURIs) {
				setPhotoURIs(selectedPhotoURIs);
			}
			navigation.navigate('PostImageScreen', { imageBase64: selectedPhotoURIs });
		}
	}

	return (
		<View style={PostImageButtonStyle.container}>
			<TouchableOpacity onPress={pickImage} testID="post-image-button">
				<AntDesign name="form" size={50} color="black" />
			</TouchableOpacity>
		</View>
	)
};

export default PostImageButton;